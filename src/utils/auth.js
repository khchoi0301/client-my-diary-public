import axios from 'axios';
import api from '../api/api';

const url = api.url;
console.log(url);

const TokenHeader = {
  headers: {
    authorization: localStorage.token || null,
  },
};

const getToken = () => {
  return localStorage.getItem('token');
};

const userCheck = async () => {
  console.log('userCheck', TokenHeader);
  const result = await axios.get(`${url}/auth/check`, TokenHeader);
  return result.data;
};

export default { getToken, userCheck };
