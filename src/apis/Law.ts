import { useQuery } from '@tanstack/react-query';
import instance from './index';

const path = '/laws';

export interface LawDetailType {
  lawId: number;
  lawTitle: string;
  lawSummaryContent: { summaryElement: string }[];
  lawStatus: string;
  propositionDate: string;
  backgroundInfo: string;
  example: string;
}

// 법안 전체 조회
export const useLawList = () => {
  return useQuery({
    queryKey: ['LawList'],
    queryFn: async () => {
      const { data } = await instance.get(path);
      return data;
    },
  });
};

// 법안 상세 보기
export const useLawDetail = (lawId: number) => {
  return useQuery<LawDetailType>({
    queryKey: ['LawDetail'],
    queryFn: async () => {
      const { data } = await instance.get(`${path}/${lawId}`);
      return data;
    },
    enabled: !!lawId,
  });
};

//찬반 논리 조회
export const useGetVoteArguments = (lawId: number) => {
  return useQuery({
    queryKey: ['VoteArguments'],
    queryFn: async () => {
      const { data } = await instance.get(`${path}/logic/${lawId}`);
      return data;
    },
  });
};
