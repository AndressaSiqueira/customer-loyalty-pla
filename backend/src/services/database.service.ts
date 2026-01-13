import { Pool } from 'pg';
import sql from 'mssql';
import { config } from '../config';
import type { KPIData, OperationalHealth, DashboardData } from '../types';

class DatabaseService {
  private pgPool: Pool | null = null;
  private mssqlPool: sql.ConnectionPool | null = null;
  
  async initialize(): Promise<void> {
    try {
      if (config.database.type === 'postgres') {
        this.pgPool = new Pool(config.database.postgres);
        await this.pgPool.query('SELECT NOW()');
        console.log('PostgreSQL connection established');
      } else if (config.database.type === 'mssql') {
        this.mssqlPool = await sql.connect(config.database.mssql);
        console.log('Azure SQL connection established');
      }
    } catch (error) {
      console.error('Database initialization error:', error);
      throw error;
    }
  }

  async getKPIData(): Promise<KPIData[]> {
    try {
      if (config.database.type === 'postgres' && this.pgPool) {
        const result = await this.pgPool.query(`
          SELECT 
            id, 
            label, 
            value, 
            change, 
            trend, 
            target, 
            progress, 
            color 
          FROM kpi_data 
          ORDER BY id
        `);
        return result.rows;
      } else if (config.database.type === 'mssql' && this.mssqlPool) {
        const result = await this.mssqlPool.request().query(`
          SELECT 
            id, 
            label, 
            value, 
            change, 
            trend, 
            target, 
            progress, 
            color 
          FROM kpi_data 
          ORDER BY id
        `);
        return result.recordset;
      }
      
      throw new Error('Database not initialized');
    } catch (error) {
      console.error('Error fetching KPI data:', error);
      throw error;
    }
  }

  async getOperationalHealth(): Promise<OperationalHealth[]> {
    try {
      if (config.database.type === 'postgres' && this.pgPool) {
        const result = await this.pgPool.query(`
          SELECT 
            id, 
            label, 
            status, 
            health 
          FROM operational_health 
          ORDER BY id
        `);
        return result.rows;
      } else if (config.database.type === 'mssql' && this.mssqlPool) {
        const result = await this.mssqlPool.request().query(`
          SELECT 
            id, 
            label, 
            status, 
            health 
          FROM operational_health 
          ORDER BY id
        `);
        return result.recordset;
      }
      
      throw new Error('Database not initialized');
    } catch (error) {
      console.error('Error fetching operational health:', error);
      throw error;
    }
  }

  async getDashboardData(): Promise<DashboardData> {
    const [kpis, operationalHealth] = await Promise.all([
      this.getKPIData(),
      this.getOperationalHealth()
    ]);

    return {
      kpis,
      operationalHealth,
      timestamp: new Date().toISOString()
    };
  }

  async close(): Promise<void> {
    if (this.pgPool) {
      await this.pgPool.end();
      console.log('PostgreSQL connection closed');
    }
    if (this.mssqlPool) {
      await this.mssqlPool.close();
      console.log('Azure SQL connection closed');
    }
  }
}

export const databaseService = new DatabaseService();
