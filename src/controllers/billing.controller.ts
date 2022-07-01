import { Request, Response } from 'express';
import Billing from '../models/billing.model';
import { AuthPayload, ValidationError } from '../types/auth';
import { BillingInfo } from '../types/billing';
import handleError from '../utils/handleError';

export const getBillingList = async (
    req: Request<
        { auth: AuthPayload },
        Record<string, unknown>,
        Record<string, unknown>,
        { page?: string; select?: string; search?: string }
    >,
    res: Response,
): Promise<void> => {
    const { page, select, search } = req.query;
    const skipCount = page ? (+page - 1) * 10 : 0;
    try {
        const billingList = await Billing.find(
            search
                ? {
                      $or: [{ fullName: search }, { email: search }, { phone: search }],
                  }
                : {},
            select ? { _id: 1, [select]: 1 } : undefined,
        )
            .skip(search ? 0 : skipCount)
            .limit(page ? 10 : 0);
        res.status(200).json({ billingList });
    } catch (err) {
        res.status(500).json(err);
    }
};

export const addBilling = async (
    req: Request<{ auth: AuthPayload }, Record<string, unknown>, BillingInfo>,
    res: Response,
): Promise<void> => {
    const { fullName, email, phone, paidAmount } = req.body;
    const validEmail = /\S+@\S+\.\S+/.test(email);
    const validPhone = phone.trim().length === 11;
    if (fullName && paidAmount && validEmail && validPhone) {
        try {
            const newBilling = new Billing({ fullName, email, phone, paidAmount });
            const billing = await newBilling.save();
            res.status(200).json({ billing, message: 'Billing Added Successfully' });
        } catch (err) {
            const errors = handleError(err as ValidationError);
            res.status(203).json({ errors });
        }
        return;
    }
    const errors = {} as BillingInfo;
    if (!fullName) {
        errors.fullName = 'Full name is Required';
    }
    if (!validEmail) {
        errors.email = 'Valid Email is Required';
    }
    if (!validPhone) {
        errors.phone = 'Phone number should be 11 digits';
    }
    if (!paidAmount) {
        errors.paidAmount = 'Paid amount is Required';
    }
    res.status(203).json({ errors });
};

export const updateBilling = async (
    req: Request<{ auth: AuthPayload; id: string }, Record<string, unknown>, BillingInfo>,
    res: Response,
): Promise<void> => {
    const { id } = req.params;
    const { fullName, email, phone, paidAmount } = req.body;
    try {
        const updatedBilling = await Billing.findByIdAndUpdate(
            id,
            {
                fullName,
                email,
                phone,
                paidAmount,
            },
            { new: true },
        );
        res.status(200).json({ updatedBilling, message: 'Billing Updated Successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteBilling = async (
    req: Request<{ auth: AuthPayload; id: string }>,
    res: Response,
): Promise<void> => {
    const { id } = req.params;
    try {
        await Billing.findByIdAndDelete(id);
        res.status(200).json({ message: 'Billing Deleted Successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
};
