import { sign } from 'jsonwebtoken';
import { AuthPayload } from '../types/auth';

const createJwtToken = (payload: AuthPayload): string => {
    return sign(payload, process.env.JWT_SECRET || '', {
        expiresIn: 182 * 24 * 60 * 60,
    });
};

export default createJwtToken;
