import { useState, useEffect, useCallback } from 'react';
import { Tower, PaginationParams } from '../types';
import { towerService } from '../services/api';
import toast from 'react-hot-toast';

export const useTowers = (initialParams: PaginationParams) => {
  const [towers, setTowers] = useState<Tower[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [params, setParams] = useState(initialParams);

  const fetchTowers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await towerService.getTowers(params);
      setTowers(response.data);
      setTotal(response.total || 0);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch towers');
      toast.error('Failed to fetch towers');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchTowers();
  }, [fetchTowers]);

  const updateParams = (newParams: Partial<PaginationParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  const deleteTower = async (id: string) => {
    try {
      await towerService.deleteTower(id);
      toast.success('Tower deleted successfully');
      fetchTowers();
    } catch (err: any) {
      toast.error('Failed to delete tower');
    }
  };

  const deleteTowers = async (ids: string[]) => {
    try {
      await towerService.deleteTowers(ids);
      toast.success(`${ids.length} towers deleted successfully`);
      fetchTowers();
    } catch (err: any) {
      toast.error('Failed to delete towers');
    }
  };

  return {
    towers,
    loading,
    error,
    total,
    params,
    updateParams,
    deleteTower,
    deleteTowers,
    refetch: fetchTowers,
  };
};