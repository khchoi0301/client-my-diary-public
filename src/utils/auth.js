import axios from 'axios';

const url = 'http://ec2-54-218-47-139.us-west-2.compute.amazonaws.com';
// const url = 'http://10.130.151.17:3001'; // 테스트용 서버
// const url = 'http://ec2-54-218-47-139.us-west-2.compute.amazonaws.com';


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
