import { useQuery } from "@tanstack/react-query";
import instance from "./index";

const path = '/laws';

// 법안 전체 조회
export const useLawList = () => {
  return useQuery({
    queryKey: ['LawList'],
    queryFn: async () => {
      const { data } = await instance.get(path);
      return data;
    }
  });
};

// 법안 상세 보기
export const useLawDetail = (lawId: number) => {
  return useQuery({
    queryKey: ['LawDetail'],
    queryFn: async () => {
      const { data } = await instance.get(`${path}/${lawId}`);
      return data;
    }
  })
}