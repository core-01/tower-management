import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Modal } from '../components/UI/Modal';
import { TableSkeleton } from '../components/UI/LoadingSkeleton';
import { useTowers } from '../hooks/useTowers';
import { Tower } from '../types';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Filter
} from 'lucide-react';
import toast from 'react-hot-toast';

export const TowerList: React.FC = () => {
  const [selectedTowers, setSelectedTowers] = useState<string[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [towerToDelete, setTowerToDelete] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const {
    towers,
    loading,
    total,
    params,
    updateParams,
    deleteTower,
    deleteTowers,
  } = useTowers({
    page: 1,
    limit: 20,
    sortBy: 'lastUpdated',
    sortOrder: 'desc',
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTowers(towers.map(t => t.id));
    } else {
      setSelectedTowers([]);
    }
  };

  const handleSelectTower = (towerId: string, checked: boolean) => {
    if (checked) {
      setSelectedTowers([...selectedTowers, towerId]);
    } else {
      setSelectedTowers(selectedTowers.filter(id => id !== towerId));
    }
  };

  const handleSort = (field: string) => {
    const newOrder = params.sortBy === field && params.sortOrder === 'asc' ? 'desc' : 'asc';
    updateParams({ sortBy: field, sortOrder: newOrder, page: 1 });
  };

  const handleDeleteConfirm = async () => {
    if (towerToDelete) {
      await deleteTower(towerToDelete);
    } else if (selectedTowers.length > 0) {
      await deleteTowers(selectedTowers);
      setSelectedTowers([]);
    }
    setDeleteModalOpen(false);
    setTowerToDelete(null);
  };

  const handleExport = async () => {
    try {
      // Mock export functionality
      toast.success('Export started. Download will begin shortly.');
    } catch (error) {
      toast.error('Failed to export towers');
    }
  };

  const getStatusBadge = (status: Tower['status']) => {
    const colors = {
      Active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      Inactive: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      Maintenance: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      Planned: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
        {status}
      </span>
    );
  };

  const totalPages = Math.ceil(total / params.limit);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tower Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your tower infrastructure and monitor performance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {selectedTowers.length > 0 && (
            <>
              <Button
                variant="outline"
                onClick={handleExport}
              >
                <Download className="mr-2 h-4 w-4" />
                Export ({selectedTowers.length})
              </Button>
              <Button
                variant="danger"
                onClick={() => setDeleteModalOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete ({selectedTowers.length})
              </Button>
            </>
          )}
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Link to="/towers/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tower
            </Button>
          </Link>
        </div>
      </div>

      {showFilters && (
        <Card animation="slide-up" hover={false}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tower Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="">All Types</option>
                <option value="Monopole">Monopole</option>
                <option value="Lattice">Lattice</option>
                <option value="Guyed">Guyed</option>
                <option value="Stealth">Stealth</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Planned">Planned</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="Search location..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                Apply Filters
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card padding={false} hover={false} animation="scale-in">
        {loading ? (
          <div className="p-6">
            <TableSkeleton />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedTowers.length === towers.length && towers.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('towerCode')}
                        className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-100"
                      >
                        <span>Tower Code</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('address')}
                        className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-100"
                      >
                        <span>Location</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('type')}
                        className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-100"
                      >
                        <span>Type</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('status')}
                        className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-100"
                      >
                        <span>Status</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <button
                        onClick={() => handleSort('lastUpdated')}
                        className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-100"
                      >
                        <span>Last Updated</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {towers.map((tower) => (
                    <tr key={tower.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-[1.01] hover:shadow-sm animate-fade-in">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedTowers.includes(tower.id)}
                          onChange={(e) => handleSelectTower(tower.id, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-200 hover:text-blue-600">
                          {tower.towerCode}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                          {tower.address}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {tower.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(tower.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(tower.lastUpdated).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/towers/${tower.id}`}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-200 hover:scale-125 hover:rotate-12"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            to={`/towers/${tower.id}/edit`}
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-all duration-200 hover:scale-125 hover:rotate-12"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => {
                              setTowerToDelete(tower.id);
                              setDeleteModalOpen(true);
                            }}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-all duration-200 hover:scale-125 hover:rotate-12"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Showing {((params.page - 1) * params.limit) + 1} to{' '}
                    {Math.min(params.page * params.limit, total)} of {total} results
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={params.page === 1}
                      onClick={() => updateParams({ page: params.page - 1 })}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Page {params.page} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={params.page === totalPages}
                      onClick={() => updateParams({ page: params.page + 1 })}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {towerToDelete
              ? 'Are you sure you want to delete this tower? This action cannot be undone.'
              : `Are you sure you want to delete ${selectedTowers.length} selected towers? This action cannot be undone.`
            }
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};