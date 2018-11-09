import axios from 'axios';
import api from '../api/api';

// const url =
//  'http://ec2-13-209-41-118.ap-northeast-2.compute.amazonaws.com:3001'; // 주연님 AWS 서버
// const url = 'http://ec2-54-218-47-139.us-west-2.compute.amazonaws.com';
const url = api.url;
console.log(url);
// 'http://10.130.151.17:3001';

const TokenHeader = {
  headers: {
    authorization: localStorage.token || null,
  },
};

const getToken = () => {
  return localStorage.getItem('token');
};

const userCheck = async () => {
  const result = await axios.get(`${url}/auth/check`, TokenHeader);

  return result.data;
};

export default { getToken, userCheck };
