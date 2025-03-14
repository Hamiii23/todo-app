import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { 
    emailValidator,
    stringValidator,
    passwordValidator
 } from '../utils/typeValidation.js';
import { User } from '../models/user.model.js';
import { List } from '../models/list.model.js';
import mongoose from 'mongoose';

const generateTokens = async (userId) => {
    try {
            const user = await User.findById(userId);
            const accessToken = user.generateAccessToken();
            const refreshToken = user.generateRefreshToken();

            user.refreshToken = refreshToken;
            await user.save({validateBeforeSave: false});

            return {
                accessToken,
                refreshToken
            };
    } catch (error) {
            throw new ApiError(500, "Something went wrong while generating the tokens");    
    };
};

const options = {
    httpOnly: true,
    secure: true
};

const registerUser = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;

    const errors = []

    if(!(email && password && username)) {
        throw new ApiError(400, 'Username, email, and password are required');
    };
    
    if(!emailValidator.safeParse(email).success) {
        errors.push('Invalid Type: Email should be in a string and in a proper format');
    };
    
    if(!stringValidator.safeParse(username).success) {
        errors.push('Invalid Type: Username must be a string');
    };

    if(!passwordValidator.safeParse(password).success) {
        errors.push('Invalid Type: Password should be a string and of at least 8 characters');
    };

    if(name) {
        if(!stringValidator.safeParse(name).success) {
            errors.push('Invalid Type: Name should be a string');
        };
    };

    if(errors.length > 0) {
        throw new ApiError(400, errors);
    };

    const existingUser = await User.findOne({
        $or: [
            {username},
            {email}
        ]
    });

    if(existingUser) {
        throw new ApiError(400, "Username/Email already exists");
    };

    const user = await User.create({
        name,
        username,
        email,
        password
    });

    const inboxList = await List.create({
        name: 'Inbox',
        owner: user._id
    });

    const completedList = await List.create({
        name: 'Completed',
        owner: user._id
    });

    user.lists.push(inboxList, completedList);
    
    await user.save({validateBeforeSave: false});

    if(!user || !inboxList || !completedList) {
        throw new ApiError(500, "Something went wrong while registering the user");
    };

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
    .status(200)
    .json(new ApiResponse(
        200, 
        createdUser, 
        'User registered successfully'
    ));
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password} = req.body;

    if(!(username || email)) {
        throw new ApiError(400, "Email or Username is required");
    };

    const errors = [];

    if(email) {
        if(!emailValidator.safeParse(email).success) {
            errors.push('Invalid Type: Email should be in a string and in a proper format')
        };
    };

    if(username) {
        if(!stringValidator.safeParse(username).success) {
            errors.push('Invalid Type: Username must be a string');
        };
    };

    if(!stringValidator.safeParse(password).success) {
        errors.push('Invalid Type: Password should be a string and of at least 8 characters');
    };

    if(errors.length > 0) {
        throw new ApiError(400, errors);
    };

    const user = await User.findOne({
        $or: [
            {username},
            {email}
        ]
    });

    if(!user) {
        throw new ApiError(400,'User does not exist with given email or username');
    };

    const passwordCheck = await user.verifyPassword(password);

    if(!passwordCheck) {
        throw new ApiError(400, "Incorrect password");
    };

    const { accessToken, refreshToken } = await generateTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(new ApiResponse(
        200, {
            user: loggedInUser,
            accessToken,
            refreshToken
        }, 
        "Logged in successfully"));
});

const logOutUser = asyncHandler(async (req, res) => {
    const user = req.user;

    await User.findByIdAndUpdate(
        user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    );

    return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(
        new ApiResponse(
            200,
            {},
            "Logged out successfully"
        )
    );
});

const updateUser = asyncHandler(async (req, res) => {
    const {username, email, name} = req.body;

    const user = req.user;

    const errors = [];
    
    if(email) {
        if(!emailValidator.safeParse(email).success) {
            errors.push('Invalid Type: Email should be in a string and in a proper format');
        } else {
            user.email = email;
        };
    };

    if(username) {
        if(!stringValidator.safeParse(username).success) {
            errors.push('Invalid Type: Username must be a string');
        } else {
            user.username = username;
        };
    } ;   

    if(name) {
        if(!stringValidator.safeParse(name).success) {
            errors.push('Invalid Type: Name should be a string');
        } else {
            user.name = name;
        };
    };

    if(errors.length > 0) {
        throw new ApiError(400, errors);
    };

    const updatedUser = await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedUser,
            'User updated successfully'
        )
    );
});

const getUser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            req.user, 
            "User data fetched successfully"
        )
    );
});

const changePassword = asyncHandler( async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword} = req.body;

    const user = await User.findById(req.user?._id);

    const errors = [];

    if(!(newPassword == confirmNewPassword)) {
        errors.push(400, 'New Password and Confirm New Password does not match');
    };

    if(!passwordValidator.safeParse(newPassword).success) {
        errors.push('Invalid Type: New Password should be a string and of at least 8 characters');
    };

    if(!passwordValidator.safeParse(confirmNewPassword).success) {
        errors.push('Invalid Type: Confirm New Password should be a string and of at least 8 characters');
    };


    if(errors.length > 0) {
        throw new ApiError(400, errors);
    };

    const passwordCheck = await user.verifyPassword(oldPassword);

    if(!passwordCheck) {
        throw new ApiError(400, "Incorrect Old Password");
    };

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, 'Password Changed Successfully')
    );
});

export {
    registerUser,
    loginUser,
    logOutUser,
    updateUser,
    getUser,
    changePassword
};