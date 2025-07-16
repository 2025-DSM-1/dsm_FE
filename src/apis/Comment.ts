import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import instance from './index';

const path = '/comments';

export type CommentType = 'BASIC' | 'ADDITIONAL' | 'REBUTTAL';

export interface CommentData {
  commentType: CommentType;
  content: string;
}

// 찬반 댓글 등록
export const useAddVoteComment = (lawId: number) => {
  return useMutation<void, AxiosError, CommentData>({
    mutationFn: async (commentData) => {
      await instance.post(`${path}/${lawId}`, commentData);
    },
    onSuccess: () => {
      console.log('찬반 댓글 등록 성공');
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};

// 전체 찬반 댓글 조회
export const useGetVoteComment = () => {
  return useQuery({
    queryKey: ['VoteComment'],
    queryFn: async () => {
      const { data } = await instance.get(`${path}`);
      return data;
    },
    refetchInterval: 5000,
  });
};
