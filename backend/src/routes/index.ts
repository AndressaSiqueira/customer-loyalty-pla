import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller';

const router = Router();

// Health check endpoint
router.get('/health', dashboardController.healthCheck.bind(dashboardController));

// Dashboard data endpoints
router.get('/dashboard', dashboardController.getDashboardData.bind(dashboardController));
router.get('/kpis', dashboardController.getKPIs.bind(dashboardController));
router.get('/operational-health', dashboardController.getOperationalHealth.bind(dashboardController));

export default router;
