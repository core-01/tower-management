import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { LoadingSkeleton } from '../components/UI/LoadingSkeleton';
import { Tower, Tenant } from '../types';
import { 
  Edit, 
  Trash2, 
  MapPin, 
  Calendar, 
  Ruler, 
  Users, 
  Activity,
  ArrowLeft
} from 'lucide-react';
import toast from 'react-hot-toast';

export const TowerDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tower, setTower] = useState<Tower | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTower = async () => {
      try {
        // Mock data for demonstration
        const mockTower: Tower = {
          id: id!,
          towerCode: 'TWR-2024-001',
          address: '123 Tower Street, Tech City, TC 12345',
          type: 'Monopole',
          status: 'Active',
          coordinates: { latitude: 40.7128, longitude: -74.0060 },
          description: 'Primary communication tower serving downtown area with high-capacity equipment and redundant power systems.',
          installationDate: '2023-06-15',
          height: 150,
          capacity: 12,
          lastUpdated: '2024-01-15T10:30:00Z',
          tenants: [
            {
              id: '1',
              name: 'VerizonWireless',
              type: 'Carrier',
              contractStart: '2023-07-01',
              contractEnd: '2028-06-30',
              monthlyRevenue: 12500,
            },
            {
              id: '2',
              name: 'AT&T Mobility',
              type: 'Carrier',
              contractStart: '2023-08-15',
              contractEnd: '2028-08-14',
              monthlyRevenue: 11800,
            },
            {
              id: '3',
              name: 'City Emergency Services',
              type: 'Emergency Services',
              contractStart: '2023-06-15',
              contractEnd: '2026-06-14',
              monthlyRevenue: 3200,
            },
          ],
        };
        setTower(mockTower);
      } catch (error) {
        toast.error('Failed to fetch tower details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTower();
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this tower?')) {
      try {
        // await towerService.deleteTower(id!);
        toast.success('Tower deleted successfully');
        navigate('/towers');
      } catch (error) {
        toast.error('Failed to delete tower');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <LoadingSkeleton rows={8} />
        </Card>
      </div>
    );
  }

  if (!tower) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Tower not found</p>
      </div>
    );
  }

  const getStatusBadge = (status: Tower['status']) => {
    const colors = {
      Active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      Inactive: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      Maintenance: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      Planned: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}>
        {status}
      </span>
    );
  };

  const getTenantTypeBadge = (type: Tenant['type']) => {
    const colors = {
      Carrier: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      Broadcaster: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'Emergency Services': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${colors[type]}`}>
        {type}
      </span>
    );
  };

  const totalRevenue = tower.tenants?.reduce((sum, tenant) => sum + tenant.monthlyRevenue, 0) || 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 animate-slide-in-left">
          <Button
            variant="outline"
            onClick={() => navigate('/towers')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Towers
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {tower.towerCode}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Tower Details and Management
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 animate-slide-in-right">
          <Link to={`/towers/${id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card animation="bounce-in" hover={true}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-blue-600">
                Tower Information
              </h2>
              {getStatusBadge(tower.status)}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Tower Code
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white font-mono">
                    {tower.towerCode}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Type
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {tower.type}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Height
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {tower.height ? `${tower.height} feet` : 'Not specified'}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Installation Date
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {tower.installationDate 
                      ? new Date(tower.installationDate).toLocaleDateString()
                      : 'Not specified'
                    }
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Capacity
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {tower.capacity ? `${tower.capacity} tenants` : 'Not specified'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Last Updated
                  </label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {new Date(tower.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Address
              </label>
              <div className="mt-1 flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <p className="text-sm text-gray-900 dark:text-white">
                  {tower.address}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Coordinates
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white font-mono">
                {tower.coordinates.latitude}, {tower.coordinates.longitude}
              </p>
            </div>

            {tower.description && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Description
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                  {tower.description}
                </p>
              </div>
            )}
          </Card>

          <Card animation="slide-in-left" hover={true}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-blue-600">
                Tenants ({tower.tenants?.length || 0})
              </h2>
              <Button size="sm">
                <Users className="mr-2 h-4 w-4" />
                Add Tenant
              </Button>
            </div>

            {tower.tenants && tower.tenants.length > 0 ? (
              <div className="space-y-4">
                {tower.tenants.map((tenant) => (
                  <div
                    key={tenant.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900 dark:text-white transition-colors duration-200 hover:text-blue-600">
                          {tenant.name}
                        </h3>
                        {getTenantTypeBadge(tenant.type)}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          ${tenant.monthlyRevenue.toLocaleString()}/month
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div>
                        <span className="font-medium">Contract Start:</span>{' '}
                        {new Date(tenant.contractStart).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Contract End:</span>{' '}
                        {new Date(tenant.contractEnd).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50 animate-float" />
                <p>No tenants assigned to this tower</p>
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card animation="slide-in-right" hover={true}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300 group-hover:text-blue-600">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Active Tenants
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {tower.tenants?.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Monthly Revenue
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ${totalRevenue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Ruler className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Height
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {tower.height ? `${tower.height} ft` : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Installed
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {tower.installationDate 
                    ? new Date(tower.installationDate).getFullYear()
                    : 'N/A'
                  }
                </span>
              </div>
            </div>
          </Card>

          <Card animation="scale-in" hover={true}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300 group-hover:text-blue-600">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-900 dark:text-white font-medium transition-colors duration-200 hover:text-blue-600">
                  Tenant contract renewed
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  VerizonWireless • 2 days ago
                </p>
              </div>
              <div className="text-sm">
                <p className="text-gray-900 dark:text-white font-medium transition-colors duration-200 hover:text-blue-600">
                  Maintenance completed
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  System maintenance • 1 week ago
                </p>
              </div>
              <div className="text-sm">
                <p className="text-gray-900 dark:text-white font-medium transition-colors duration-200 hover:text-blue-600">
                  Status updated to Active
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  John Doe • 2 weeks ago
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};