import ENV from '../utils/env';
import axios from 'axios';

const api = (() => {
  console.log('NGINX_SERVER_EC2_HOST : ', ENV.NGINX_SERVER_EC2_HOST);

  // const NGINX_SERVER_EC2_HOST = ENV.NGINX_SERVER_EC2_HOST;

  const signalApi = axios.create({
    baseURL: `${ENV.NGINX_SERVER_EC2_HOST}/signal`,
  });

  const setupInterceptors = () => {
    // 요청 인터셉터
    signalApi.interceptors.request.use(
      (config) => {
        console.log('정상 요청');
        return config;
      },
      (error) => {
        console.log('비정상 요청');
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터
    signalApi.interceptors.response.use(
      (response) => {
        console.log('정상 응답');
        return response;
      },
      (error) => {
        console.log('응답 오류:', error);
        return Promise.reject(error);
      }
    );
  };

  setupInterceptors();

  return signalApi;
})();

export default api;
