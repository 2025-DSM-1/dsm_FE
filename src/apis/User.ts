import { useQuery } from "@tanstack/react-query";
import instance from "./index";

const path = '/users'

// 마이페이지 조회
export const useMy = () => {
  return useQuery({
    queryKey: ['My'],
    queryFn: async () => {
      const { data } = await instance.get(`${path}/my-page`);
      return data;
    }
  })
}