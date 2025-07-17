import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import instance from './index';
import { useNavigate } from 'react-router-dom';
import { setToken } from './function/TokenManager';

const path = '/auth';

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

// 회원가입
export const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation<void, AxiosError, SignUpData>({
    mutationFn: async (formData) => {
      await instance.post(`${path}/sign-up`, formData);
    },
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    },
    onError: (error) => {
      console.error(error.message);
      if (error.response?.status === 400) {
        alert(error.response?.data?.message);
      }
    },
  });
};

// 로그인
export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation<LoginResponse, AxiosError, LoginData>({
    mutationFn: async (loginData) => {
      const response = await instance.post(`${path}/login`, loginData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.accessToken && data.refreshToken) {
        setToken(data.accessToken, data.refreshToken);
      }
      navigate('/bill/main');
      console.log('로그인 성공');
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
