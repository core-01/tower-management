export interface Tower {
  id: string;
  towerCode: string;
  address: string;
  type: 'Monopole' | 'Lattice' | 'Guyed' | 'Stealth';
  status: 'Active' | 'Inactive' | 'Maintenance' | 'Planned';
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description?: string;
  installationDate?: string;
  height?: number;
  capacity?: number;
  lastUpdated: string;
  tenants?: Tenant[];
}

export interface Tenant {
  id: string;
  name: string;
  type: 'Carrier' | 'Broadcaster' | 'Emergency Services';
  contractStart: string;
  contractEnd: string;
  monthlyRevenue: number;
}

export interface DashboardMetrics {
  totalTowers: number;
  activeTowers: number;
  maintenanceDue: number;
  monthlyRevenue: number;
  towersBy: {
    type: Array<{ name: string; value: number; color: string }>;
    status: Array<{ name: string; value: number; color: string }>;
  };
  recentActivity: Array<{
    id: string;
    action: string;
    tower: string;
    timestamp: string;
    user: string;
  }>;
}

export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  limit?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}