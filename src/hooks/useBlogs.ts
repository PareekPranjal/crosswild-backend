import { useQuery } from '@tanstack/react-query';
import { blogsAPI } from '@/lib/api';

type BlogParams = Parameters<typeof blogsAPI.getAll>[0];

export function useBlogs(params?: BlogParams) {
  return useQuery({
    queryKey: ['blogs', params ?? {}],
    queryFn: () => blogsAPI.getAll(params),
  });
}

export function useBlog(id: string) {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogsAPI.getById(id),
    enabled: !!id,
  });
}
