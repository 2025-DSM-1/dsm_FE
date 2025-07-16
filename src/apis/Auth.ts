import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import instance from './index';
import { useNavigate } from 'react-router-dom';

const path = '/auth';

interface SignUpData {
  name: string;
  email: string;
  authCode: string;
  password: string;
  passwordCheck: string;
}

interface LoginData {
  email: string;
  password: string;
}

// 회원가입
export const useSignUp = () => {
  return useMutation<void, AxiosError, SignUpData>({
    mutationFn: async (formData) => {
      await instance.post(`${path}/sign-up`, formData);
    },
    onSuccess: () => {
      console.log('회원가입 성공');
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};

// 로그인
export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation<void, AxiosError, LoginData>({
    mutationFn: async (loginData) => {
      await instance.post(`${path}/login`, loginData);
    },
    onSuccess: () => {
      navigate('/bill/main');
      console.log('로그인 성공');
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
