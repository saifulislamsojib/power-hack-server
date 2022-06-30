import { model, Schema } from 'mongoose';
import { IBilling } from '../types/billing';

const billingModel = new Schema({
    fullName: {
        type: String,
        trim: true,
        required: [true, 'Full name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        validate: [(val: string) => /\S+@\S+\.\S+/.test(val), 'Valid email is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        trim: true,
        validate: [(val: string) => val.trim().length === 11, 'Phone number should be 11 digits'],
    },
    paidAmount: {
        type: String,
        required: [true, 'Paid amount is required'],
        trim: true,
    },
});

const Billing = model<IBilling>('billing', billingModel);

export default Billing;
