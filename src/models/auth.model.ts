import { model, Schema } from 'mongoose';
import { Auth } from '../types/auth';

const authModel = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: true,
        validate: [(val: string) => /\S+@\S+\.\S+/.test(val), 'Valid email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password is required minimum 6 characters'],
    },
});

const User = model<Auth>('user', authModel);

export default User;
