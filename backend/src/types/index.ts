// Type definitions for the API
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
