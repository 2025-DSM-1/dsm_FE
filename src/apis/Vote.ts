import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import instance from "./index";

const path = '/votes'

export interface VoteOnBillData {
  voteType: "AGREE" | "DISAGREE";
}

// 법안 찬반 투표
export const useVoteOnBill = (lawId: number) => {
  return useMutation<void, AxiosError, VoteOnBillData>({
    mutationFn: async (data) => {
      await instance.post(`${path}/${lawId}`, data)
    },
    onSuccess: () => {
      console.log("법안 찬반 투표 성공");
    },
    onError: (error) => {
      console.error(error.message);
    }
  })
}

// 법안 찬반 그래프 조회
export const useGetVoteGraph = (lawId: number) => {
  return useQuery({
    queryKey: ['VoteGraph'],
    queryFn: async () => {
      const { data } = await instance.get(`${path}/${lawId}`);
      return data
    } 
  })
}