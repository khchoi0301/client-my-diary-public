import axios from 'axios';
import api from '../api/api';

const url = api.url;
console.log(url);


var TokenHeader = {
  headers: {
    authorization: localStorage.token || null,
  },
};


const getToken = () => {
  return localStorage.getItem('token');
};

const userCheck = async () => {

  TokenHeader = {
    headers: {
      authorization: localStorage.token || null,
    },
  };

  console.log('TokenHeader', TokenHeader.headers);
  const result = await axios.get(`${url}/auth/check`, TokenHeader);
  return result.data;
};

export default { getToken, userCheck };
