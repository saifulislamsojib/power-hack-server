export interface BillingInfo {
    fullName: string;
    email: string;
    phone: string;
    paidAmount: string;
}

export interface IBilling extends BillingInfo {
    _id: string;
}
