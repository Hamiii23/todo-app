import mongoose from "mongoose";
import { List } from "../models/list.model";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import {
  emailValidator,
  passwordValidator,
  stringValidator,
} from "../utils/typeValidation";

const generateTokens = async (userID: mongoose.Types.ObjectId) => {
  try {
    const user = (await User.findById(userID)) as any;
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating the tokens");
  }
};

const options = {
  httpOnly: true,
  secure: true,
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  const validUsername = username ? username.toLowerCase().trim() : undefined;
  const validEmail = email ? email.toLowerCase().trim() : undefined;

  const errors: string[] = [];

  if (!(email && password && username)) {
    throw new ApiError(400, "Username, email, and password required");
  }

  //zod type validation
  if (!emailValidator.safeParse(validEmail).success) {
    errors.push(
      "Invalid Type: Email should be in a string and in a proper format",
    );
  }

  if (!stringValidator.safeParse(validUsername).success) {
    errors.push("Invalid Type: Username must be a string");
  }

  if (!passwordValidator.safeParse(password).success) {
    errors.push(
      "Invalid Type: Password should be a string and of at least 8 characters",
    );
  }

  if (name) {
    if (!stringValidator.safeParse(name).success) {
      errors.push("Invalid Type: Name should be a string");
    }
  }

  if (errors.length > 0) {
    throw new ApiError(400, errors.join("; "));
  }

  //verifies if the username is in valid format
  const usernameRegex = /^[a-zA-Z0-9_.]+$/;

  if (!usernameRegex.test(username)) {
    throw new ApiError(
      400,
      "username can only contain letters, numbers, '_' and '.'",
    );
  }
  const existingUser = await User.findOne({
    $or: [{ username: validUsername }, { email: validEmail }],
  });

  if (existingUser) {
    throw new ApiError(409, "Username/Email already exists");
  }

  //Start of user creation transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userResult = await User.create(
      [
        {
          name,
          username: validUsername,
          email: validEmail,
          password,
        },
      ],
      { session },
    );

    const user = userResult?.[0];

    if (!user || !user._id) {
      throw new ApiError(500, "Failed to create user");
    }

    const inbox = await List.create(
      [
        {
          name: "Inbox",
          owner: user._id,
          protected: true,
        },
      ],
      { session },
    );

    if (!inbox || inbox.length === 0) {
      throw new ApiError(500, "Failed to create inbox list");
    }

    await session.commitTransaction();
    //Commit the transaction

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken",
    );

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  } catch (error) {
    //Aborts transaction if user creation is failed
    await session.abortTransaction();
    throw new ApiError(500, "Transaction failed: " + error);
  } finally {
    session.endSession();
    //End of user creation transaction
  }
});

const logInUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const validEmail = email ? email.toLowerCase().trim() : undefined;
  const validUsername = username ? username.toLowerCase().trim() : undefined;

  if (!(username || email)) {
    throw new ApiError(400, "Email or Username is required");
  }

  const errors: string[] = [];

  if (email) {
    if (!emailValidator.safeParse(validEmail).success) {
      errors.push(
        "Invalid Type: Email should be in a string and in a proper format",
      );
    }
  }

  if (username) {
    if (!stringValidator.safeParse(validUsername).success) {
      errors.push("Invalid Type: Username must be a string");
    }
  }

  if (!stringValidator.safeParse(password).success) {
    errors.push(
      "Invalid Type: Password should be a string and of at least 8 characters",
    );
  }

  if (errors.length > 0) {
    throw new ApiError(400, errors.join("; "));
  }

  const user = (await User.findOne({
    $or: [{ username: validUsername }, { email: validEmail }],
  })) as any;

  if (!user) {
    throw new ApiError(400, "User does not exist with given email or username");
  }

  //verifies the password using bcrypt
  const passwordCheck = await user.verifyPassword(password);

  if (!passwordCheck) {
    throw new ApiError(400, "Incorrect password");
  }

  //generates tokens so that we can store it somewhere
  const { accessToken, refreshToken } = await generateTokens(
    user._id as mongoose.Types.ObjectId,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  //returns the user and sets the cookies
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "Logged in successfully",
      ),
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  const user = req.user;
  //comes from the auth middleware

  //deletes the existing token which is used by the auth middleware
  await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    },
  );

  //clears the cookies
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

const updateUser = asyncHandler(async (req, res) => {
  const { username, email, name } = req.body;

  const validEmail = email ? email.toLowerCase().trim() : undefined;
  const validUsername = username ? username.toLowerCase().trim() : undefined;

  const user = req.user;

  const errors = [];

  //checks if there's an email provided
  if (email) {
    //if email is provided then validate if it's a valid email
    if (!emailValidator.safeParse(validEmail).success) {
      errors.push(
        "Invalid Type: Email should be in a string and in a proper format",
      );
    } else {
      const existingEmail = await User.findOne({
        email: validEmail,
        _id: { $ne: user._id },
      });
      //if it's a valid email set it as the updated email
      if (existingEmail) {
        errors.push("Email is already taken by another user");
      } else {
        user.email = validEmail;
      }
    }
  }

  if (username) {
    const usernameRegex = /^[a-zA-Z0-9_.]+$/;

    if (!stringValidator.safeParse(validUsername).success) {
      errors.push("Invalid Type: Username must be a string");
    } else if (!usernameRegex.test(validUsername)) {
      errors.push(
        400,
        "username can only contain letters, numbers, '_' and '.'",
      );
    } else {
      const existingUsername = await User.findOne({
        username: validUsername,
        _id: { $ne: user._id },
      });
      if (existingUsername) {
        errors.push("Username is already taken by another user");
      } else {
        user.username = validUsername;
      }
    }
  }

  if (name) {
    if (!stringValidator.safeParse(name).success) {
      errors.push("Invalid Type: Name should be a string");
    } else {
      user.name = name;
    }
  }

  if (errors.length > 0) {
    throw new ApiError(400, errors.join("; "));
  }

  //pushes the updates to mongodb
  const updatedUser = await user.save({ validateBeforeSave: false });

  //returns the updated user
  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

const getUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User data fetched successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  const user = (await User.findById(req.user?._id)) as any;

  const errors = [];

  if (newPassword !== confirmNewPassword) {
    errors.push("New Password and Confirm New Password does not match");
  }

  if (oldPassword === newPassword) {
    errors.push("Old Password and New Password are the same");
  }

  if (!passwordValidator.safeParse(newPassword).success) {
    errors.push(
      "Invalid Type: New Password should be a string and of at least 8 characters",
    );
  }

  if (!passwordValidator.safeParse(confirmNewPassword).success) {
    errors.push(
      "Invalid Type: Confirm New Password should be a string and of at least 8 characters",
    );
  }

  if (errors.length > 0) {
    throw new ApiError(400, errors.join("; "));
  }

  const passwordCheck = await user.verifyPassword(oldPassword);

  if (!passwordCheck) {
    throw new ApiError(400, "Incorrect Old Password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed Successfully"));
});

const checkUsernameAndEmail = asyncHandler(async (req, res) => {
  const { username, email } = req.query;

  if (username) {
    const usernameCheck = await User.findOne({
      username: username.toString().toLowerCase(),
    });

    if (!usernameCheck) {
      res.status(200).json(new ApiResponse(200, {}, "Username is available"));
    } else {
      throw new ApiError(400, "Username is already taken");
    }
  }

  if (email) {
    const emailCheck = await User.findOne({
      email: email.toString().toLowerCase(),
    });

    if (!emailCheck) {
      res.status(200).json(new ApiResponse(200, {}, "Email is available"));
    } else {
      throw new ApiError(400, "Email is already in use");
    }
  }
});

export {
  registerUser,
  logInUser,
  logOutUser,
  updateUser,
  getUser,
  changePassword,
  checkUsernameAndEmail,
};
