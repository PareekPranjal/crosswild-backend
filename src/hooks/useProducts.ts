import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '@/lib/api';

type ProductParams = Parameters<typeof productsAPI.getAll>[0];

export function useProducts(params?: ProductParams) {
  return useQuery({
    queryKey: ['products', params ?? {}],
    queryFn: () => productsAPI.getAll(params),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsAPI.getById(id),
    enabled: !!id,
  });
}

export function useProductStats() {
  return useQuery({
    queryKey: ['product-stats'],
    queryFn: () => productsAPI.getStats(),
  });
}
