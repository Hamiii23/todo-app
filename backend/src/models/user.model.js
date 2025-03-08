import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
    {   
        name: {
            type: String
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            min: 8
        },
        todos: [
            {
                type: Schema.Types.ObjectId,
                ref: "Todo"
            }
        ],
        lists: [
            {
                type: Schema.Types.ObjectId,
                ref: "List"
            }
        ]
    }
);

userSchema.pre('save', async function (next) {
    if(!this.isModified(this.password)) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            name: this.name
        }, 
            process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id
        }, 
            process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRY
        }
    );
};

export const User = mongoose.model("User", userSchema);