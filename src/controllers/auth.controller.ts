import { compare, hash } from 'bcrypt';
import { Request, Response } from 'express';
import User from '../models/auth.model';
import { AuthPayload, ValidationError } from '../types/auth';
import createJwtToken from '../utils/createJwtToken';
import getPayload from '../utils/getPayload';
import handleError from '../utils/handleError';

export const registration = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        const user = await newUser.save();
        const payload = getPayload(user);
        const token = createJwtToken(payload);
        res.status(201).json({ auth: payload, token, message: 'Account Register Successfully' });
    } catch (err) {
        const errors = handleError(err as ValidationError);
        res.status(203).json({ errors });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user?._id) {
            const isValidPassword = await compare(password, user.password);
            if (isValidPassword) {
                const auth = getPayload(user);
                const token = createJwtToken(auth);
                res.status(201).json({ auth, token, message: 'Account Login Successfully' });
            } else {
                res.status(203).json({ error: 'Invalid Email or Password' });
            }
        } else {
            res.status(203).json({ error: 'Invalid Email or Password' });
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getLoggedInUser = async (
    req: Request<{ auth: AuthPayload }>,
    res: Response,
): Promise<void> => {
    const { _id } = req.params.auth;
    try {
        const user = await User.findOne({ _id });
        if (user?._id) {
            const auth = getPayload(user);
            res.status(201).json({ auth });
        } else {
            res.status(401).json({ message: 'Invalid token' });
        }
    } catch (err) {
        res.status(401).json(err);
    }
};
