import axios, { AxiosError } from 'axios';
import { getToken, setToken } from './function/TokenManager';

const BASEURL = import.meta.env.VITE_BASE_URL;

export const instance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});

export const refreshInstance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});

// 요청 시 accessToken 자동 삽입
instance.interceptors.request.use(
  (config) => {
    const { accessToken } = getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 401 에러 응답 시 refreshToken 사용해서 accessToken 재발급
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (axios.isAxiosError(error) && error.response) {
      const originalRequest: any = error.config;

      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes('/auth/refresh')
      ) {
        originalRequest._retry = true;

        try {
          const refreshToken = getToken().refreshToken;

          const res = await refreshInstance.get('/auth/refresh', {
            headers: {
              authorization: `Bearer ${refreshToken}`,
            },
          });

          const { access_token, refresh_token } = res.data;
          setToken(access_token, refresh_token);

          originalRequest.headers['authorization'] = `Bearer ${access_token}`;

          return instance(originalRequest);
        } catch (refreshError) {
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
