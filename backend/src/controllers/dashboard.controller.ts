import { Request, Response } from 'express';
import { databaseService } from '../services/database.service';
import type { ApiResponse, DashboardData } from '../types';

export class DashboardController {
  async getKPIs(req: Request, res: Response): Promise<void> {
    try {
      const kpis = await databaseService.getKPIData();
      const response: ApiResponse<typeof kpis> = {
        success: true,
        data: kpis,
        timestamp: new Date().toISOString()
      };
      res.json(response);
    } catch (error) {
      console.error('Error in getKPIs:', error);
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
        timestamp: new Date().toISOString()
      };
      res.status(500).json(response);
    }
  }

  async getOperationalHealth(req: Request, res: Response): Promise<void> {
    try {
      const health = await databaseService.getOperationalHealth();
      const response: ApiResponse<typeof health> = {
        success: true,
        data: health,
        timestamp: new Date().toISOString()
      };
      res.json(response);
    } catch (error) {
      console.error('Error in getOperationalHealth:', error);
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
        timestamp: new Date().toISOString()
      };
      res.status(500).json(response);
    }
  }

  async getDashboardData(req: Request, res: Response): Promise<void> {
    try {
      const data = await databaseService.getDashboardData();
      const response: ApiResponse<DashboardData> = {
        success: true,
        data,
        timestamp: new Date().toISOString()
      };
      res.json(response);
    } catch (error) {
      console.error('Error in getDashboardData:', error);
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
        timestamp: new Date().toISOString()
      };
      res.status(500).json(response);
    }
  }

  async healthCheck(req: Request, res: Response): Promise<void> {
    try {
      // Simple health check
      const response = {
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString()
      };
      res.json(response);
    } catch (error) {
      const response = {
        success: false,
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
      res.status(503).json(response);
    }
  }
}

export const dashboardController = new DashboardController();
