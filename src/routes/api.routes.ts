import { Router } from 'express';
import { getLoggedInUser, login, registration } from '../controllers/auth.controller';
import {
    addBilling,
    deleteBilling,
    getBillingList,
    updateBilling,
} from '../controllers/billing.controller';
import authCheck from '../middleware/auth.middleware';

const apiRoutes = Router();

// authentication api's
apiRoutes.post('/registration', registration);
apiRoutes.post('/login', login);
apiRoutes.get('/loggedInUser', authCheck, getLoggedInUser);

// billing api's
apiRoutes.get('/billing-list', authCheck, getBillingList);
apiRoutes.post('/add-billing', authCheck, addBilling);
apiRoutes.patch('/update-billing/:id', authCheck, updateBilling);
apiRoutes.delete('/delete-billing/:id', authCheck, deleteBilling);

export default apiRoutes;
