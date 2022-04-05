import { Router } from 'express';

import EbayRoute from './ebay.route';
import UserRoutes from './user.route';


const router = Router()
router.use('/user', UserRoutes)
router.use('/mx5', EbayRoute)

export default router
