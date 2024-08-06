import axios from 'axios';

const ENV = process.env.EXPRESS_SERVER_ENV_STATUS;

const SIGNAL_SERVER_URL =
  ENV === 'prod'
    ? `http://${process.env.NGINX_SERVER_EC2_HOST}`
    : `http://${process.env.SIGNAL_LOCAL_HOST}:${SIGNAL_LOCAL_PORT}`;

class Api {
  constructor() {
    this.signalApi = axios.create({
      baseURL: SIGNAL_SERVER_URL,
    });
    this.setupInterceptors();
  }

  setupInterceptors() {
    // 요청 인터셉터
    this.signalApi.interceptors.request.use(
      (config) => {
        console.log('정상요청');
        return config;
      },
      (error) => {
        console.log('비정상요청');
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터
    this.signalApi.interceptors.response.use(
      (response) => {
        console.log('정상 응답');
        return response;
      },
      (error) => {
        console.log('응답 오류:', error);
        return Promise.reject(error);
      }
    );
  }
}

export default Api;
