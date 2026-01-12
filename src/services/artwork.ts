import api from '../api/axios.api';
import type { ApiResponse } from '../types/artwork';

export async function fetchArtworks(
  page: number,
  limit: number
): Promise<ApiResponse> {
  const response = await api.get<ApiResponse>('/artworks', {
    params: { page, limit },
  });

  return response.data;
}
