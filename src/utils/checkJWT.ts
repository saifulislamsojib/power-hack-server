import env from 'dotenv';
import { verify } from 'jsonwebtoken';
import { AuthPayload } from '../types/auth';

env.config();

const checkJWT = (token: string | undefined): AuthPayload | null => {
    if (token && token.startsWith('Bearer ') && token.split(' ')[1]) {
        return verify(token.split(' ')[1], process.env.JWT_SECRET || '') as AuthPayload;
    }
    return null;
};

export default checkJWT;
