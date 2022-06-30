import { Auth, AuthPayload } from '../types/auth';

const getPayload = (user: Auth | AuthPayload): AuthPayload => {
    const { name, email, _id } = user;

    return {
        name,
        email,
        _id,
    };
};

export default getPayload;
