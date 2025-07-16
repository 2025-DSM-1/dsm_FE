import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import instance from "./index";

const path ='/email'

interface EmailVerifyData {
  email: string
}

interface EmailVerifyResponse {
  success: boolean;
}

interface VerifyAuthCodeData {
  email: string,
  authCode: string
}

interface VerifyAuthCodeResponse {
  isVerified: boolean
}


// 이메일 중복 확인
export const useCheckEmailDuplicate = () => {
  return useMutation<EmailVerifyResponse, AxiosError, EmailVerifyData>({
    mutationFn: async ({ email }) => {
      const response = await instance.post(`${path}/verify`, { email });
      return response.data;
    },
    onSuccess: () => {
      console.log("이메일 중복 확인 성공");
    },
    onError: (error) => {
      console.error(error.message);
    }
  })
}

// 인증 코드 발송
export const useSendAuthCode = () => {
  return useMutation<void, AxiosError, EmailVerifyData>({
    mutationFn: async ({ email }) => {
      await instance.post(`${path}/auth-code`, { email });
    },
    onSuccess: () => {
      console.log("인증 코드 발송 성공")
    },
    onError: (error) => {
      console.error(error.message);
    }
  })
}

// 인증 코드 확인
export const useVerifyAuthCode = () => {
  return useMutation<VerifyAuthCodeResponse, AxiosError, VerifyAuthCodeData>({
    mutationFn: async (formData) => {
      const response  = await instance.post(`${path}/auth-code/verify`, formData);
      return response.data;
    },
    onSuccess: () => {
      console.log("인증 코드 확인 성공")
    },
    onError: (error) => {
      console.error(error.message);
    }
  })
}