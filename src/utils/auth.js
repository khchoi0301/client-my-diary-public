import axios from 'axios';

const url =
  'http://ec2-13-209-41-118.ap-northeast-2.compute.amazonaws.com:3001';
//   'http://10.130.151.17:3001'; // 테스트용 서버

const TokenHeader = {
  headers: {
    authorization: localStorage.token,
  },
};

const getToken = () => {
  return localStorage.getItem('token');
};

const userCheck = async () => {
  const result = await axios.get(`${url}/auth/check`, TokenHeader);
  console.log(result.data.code === 200);

  return result.data;
};

export default { getToken, userCheck };
