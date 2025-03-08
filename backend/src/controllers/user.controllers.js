import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { 
    emailValidator,
    stringValidator,
    passwordValidator
 } from '../utils/typeValidation.js';
import { User } from '../models/user.model.js';
import mongoose from 'mongoose';

const generateTokens = async (userId) => {
    try {
            const user = await User.findById(userId);
            const accessToken = user.generateAccessToken();
            const refreshToken = user.generateRefreshToken();

            user.refreshToken = refreshToken;
            await user.save({validateBeforeSave: false});
    } catch (error) {
            throw new ApiError(500, "Something went wrong while generating the tokens");    
    };
};

const createUser = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;

    const errors = []

    if(!(email && password && username)) {
        throw new ApiError(400, 'Username, email, and password are required');
    };
    
    if(!emailValidator.safeParse(email)) {
        errors.push('Invalid Type: Email should be in a string and in a proper format');
    };
    
    if(!stringValidator.safeParse(username)) {
        errors.push('Invalid Type: Username must be a string');
    };

    if(!passwordValidator.safeParse(password)) {
        errors.push('Invalid Type: Password should be a string and of at least 8 characters');
    };

    if(!stringValidator.safeParse(name)) {
        errors.push('Invalid Type: Name should be a string');
    };

    if(errors.length > 0) {
        throw new ApiError(400, errors);
    };


    return res.status(200).json(new ApiResponse(200, {name, email, username, password}, ''))
});

export {
    createUser
};