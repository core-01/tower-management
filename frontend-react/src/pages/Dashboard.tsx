import React, { useState, useEffect } from 'react';
import { Card } from '../components/UI/Card';
import { LoadingSkeleton } from '../components/UI/LoadingSkeleton';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Radio, Activity, AlertTriangle, TrendingUp } from 'lucide-react';
import { DashboardMetrics } from '../types';
import { towerService } from '../services/api';

export const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Mock data for demonstration
        const mockMetrics: DashboardMetrics = {
          totalTowers: 1247,
          activeTowers: 1198,
          maintenanceDue: 23,
          monthlyRevenue: 2847500,
          towersBy: {
            type: [
              { name: 'Monopole', value: 645, color: '#3B82F6' },
              { name: 'Lattice', value: 387, color: '#10B981' },
              { name: 'Guyed', value: 156, color: '#F59E0B' },
              { name: 'Stealth', value: 59, color: '#8B5CF6' },
            ],
            status: [
              { name: 'Active', value: 1198, color: '#10B981' },
              { name: 'Maintenance', value: 23, color: '#F59E0B' },
              { name: 'Inactive', value: 18, color: '#EF4444' },
              { name: 'Planned', value: 8, color: '#6B7280' },
            ],
          },
          recentActivity: [
            { id: '1', action: 'Tower Added', tower: 'TWR-2024-001', timestamp: '2 hours ago', user: 'John Doe' },
            { id: '2', action: 'Maintenance Scheduled', tower: 'TWR-2023-456', timestamp: '4 hours ago', user: 'Jane Smith' },
            { id: '3', action: 'Status Updated', tower: 'TWR-2023-789', timestamp: '6 hours ago', user: 'Mike Johnson' },
            { id: '4', action: 'Tenant Added', tower: 'TWR-2023-321', timestamp: '1 day ago', user: 'Sarah Wilson' },
          ],
        };
        setMetrics(mockMetrics);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <LoadingSkeleton rows={3} />
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <LoadingSkeleton rows={6} />
          </Card>
          <Card>
            <LoadingSkeleton rows={6} />
          </Card>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  const MetricCard = ({ title, value, icon: Icon, color, change }: any) => (
    <Card hover={true} animation="bounce-in">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color} animate-pulse-slow group-hover:animate-bounce`}>
          <Icon className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-200">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white transition-all duration-300 group-hover:text-blue-600">{value}</p>
          {change && (
            <p className={`text-xs transition-all duration-300 ${change > 0 ? 'text-green-600 group-hover:text-green-700' : 'text-red-600 group-hover:text-red-700'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white animate-slide-in-left">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Overview of your tower management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Towers"
          value={metrics.totalTowers.toLocaleString()}
          icon={Radio}
          color="bg-blue-500"
          change={5.2}
        />
        <MetricCard
          title="Active Towers"
          value={metrics.activeTowers.toLocaleString()}
          icon={Activity}
          color="bg-green-500"
          change={2.1}
        />
        <MetricCard
          title="Maintenance Due"
          value={metrics.maintenanceDue}
          icon={AlertTriangle}
          color="bg-orange-500"
          change={-12.5}
        />
        <MetricCard
          title="Monthly Revenue"
          value={`$${(metrics.monthlyRevenue / 1000000).toFixed(1)}M`}
          icon={TrendingUp}
          color="bg-purple-500"
          change={8.7}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card hover={true} animation="slide-in-left">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300 group-hover:text-blue-600">
            Towers by Type
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={metrics.towersBy.type}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {metrics.towersBy.type.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card hover={true} animation="slide-in-right">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300 group-hover:text-blue-600">
            Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics.towersBy.status}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card hover={true} animation="scale-in">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300 group-hover:text-blue-600">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {metrics.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg px-3 transition-all duration-200 hover:scale-[1.02] animate-fade-in">
              <div>
                <p className="font-medium text-gray-900 dark:text-white transition-colors duration-200 hover:text-blue-600">
                  {activity.action}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activity.tower} by {activity.user}
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200 hover:text-gray-700 dark:hover:text-gray-300">
                {activity.timestamp}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};