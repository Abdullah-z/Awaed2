import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let STORAGE_KEY = 'APIToken';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 50000,
});

axiosInstance.interceptors.request.use(
  async function (config: any) {
    let token = await AsyncStorage.getItem(STORAGE_KEY).then((res) => {
      return res;
    });

    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export const REACT_APP_API_URL = 'https://awaed.azurewebsites.net/';

export default class CommonDataService {
  executeApiCall(path, data) {
    return axiosInstance
      .post(`${REACT_APP_API_URL}${path}`, data)
      .then((res) => res);
  }

  fetchData(path) {
    return axiosInstance.get(`${REACT_APP_API_URL}${path}`).then((res) => res);
  }

  uploadDocument(path, document) {
    var data = new FormData();
    data.append('file', document);
    return axiosInstance
      .post(`${REACT_APP_API_URL}${path}`, data)
      .then((res) => res);
  }
}
