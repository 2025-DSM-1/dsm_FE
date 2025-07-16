import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "./index";

const path = '/favorites';

// 법안 즐겨찾기 추가
export const useAddFavoriteBill = () => {
  return useMutation({
    mutationFn: async (lawId: number) => {
      await instance.post(`${path}/${lawId}`);
    },
    onSuccess: () => {
      console.log("법안 즐겨찾기 추가 성공");
    },
    onError: (error) => {
      console.error(error.message);
    }
  })
}

// 법안 즐겨찾기 해제
export const useDeleteFavoriteBill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lawId: number) => {
      await instance.delete(`${path}/${lawId}`);
    },
    onSuccess: () => {
      console.log("법안 즐겨찾기 해제 성공");
      queryClient.invalidateQueries({ queryKey: ['FavoriteList'] });
    },
    onError: (error) => {
      console.error(error.message);
    }
  })
}

// 즐겨찾기한 법안 조회
export const useGetFavoriteList = () => {
  return useQuery({
    queryKey: ['FavoriteList'],
    queryFn: async () => {
      const { data } = await instance.get(`${path}`);
      return data
    }
  })
}