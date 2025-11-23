import { User } from "../models/user.model";

export const normalizedEmail = (email?: string) =>
  email ? email.toLocaleLowerCase().trim() : undefined;

export const normalizedUsername = (username?: string) =>
  username ? username.toLocaleLowerCase().trim() : undefined;

export const checkUserExists = async ({
  username,
  email,
  excludeUserId,
}: {
  username?: string;
  email?: string;
  excludeUserId?: string;
}) => {
  return await User.findOne({
    $or: [
      ...(username ? [{ username: normalizedUsername(username) }] : []),
      ...(email ? [{ email: normalizedEmail(email) }] : []),
    ],
    ...(excludeUserId ? { _id: { $ne: excludeUserId } } : {}),
  });
};

export const checkUsernameFormat = (username?: string): string | null => {
  const usernameRegex = /^[a-zA-Z0-9_.]+$/;
  if (!usernameRegex.test(username as string)) {
    return "username can only contain letters, numbers, '_' and '.'";
  }
  return null;
};
