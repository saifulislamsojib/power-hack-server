import { Router } from 'express';
import { getLoggedInUser, login, registration } from '../controllers/auth.controller';
import authCheck from '../middleware/auth.middleware';

const apiRoutes = Router();

// authentication api's
apiRoutes.post('/registration', registration);
apiRoutes.post('/login', login);
apiRoutes.get('/loggedInUser', authCheck, getLoggedInUser);

// billing api's

export default apiRoutes;
