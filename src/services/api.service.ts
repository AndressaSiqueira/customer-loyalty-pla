// API service for backend communication

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface KPIData {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  target: string;
  progress: number;
  color: string;
}

export interface OperationalHealth {
  id: string;
  label: string;
  status: string;
  health: 'excellent' | 'good' | 'warning' | 'critical';
}

export interface DashboardData {
  kpis: KPIData[];
  operationalHealth: OperationalHealth[];
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async fetch<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  async getKPIs(): Promise<ApiResponse<KPIData[]>> {
    return this.fetch<KPIData[]>('/kpis');
  }

  async getOperationalHealth(): Promise<ApiResponse<OperationalHealth[]>> {
    return this.fetch<OperationalHealth[]>('/operational-health');
  }

  async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    return this.fetch<DashboardData>('/dashboard');
  }

  async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    return this.fetch<{ status: string }>('/health');
  }
}

export const apiService = new ApiService();
