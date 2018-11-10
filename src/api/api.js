// 이미지, 날씨는 우선 제외하고 테스팅중
// 현재 통신에 성공하면 alert, 실패하면 console.error을 띄움. 추후에 어떤 이벤트를 발생할지 생각해야 함.
import axios from 'axios';

// const url = 'http://10.130.151.17:3001'; //bbk
// const url = 'http://10.130.151.10:3001';//JY
const url = 'http://13.209.41.118:3001'; //aws
// const url =
//   'http://ec2-13-209-41-118.ap-northeast-2.compute.amazonaws.com:3001'; // 주연님 AWS 서버
// const url = 'http://ec2-54-191-92-219.us-west-2.compute.amazonaws.com'; //

const TokenHeader = {
  headers: {
    authorization: localStorage.token,
  },
};

// 성공 + 프로미스화
const loginPost = loginUserInfo => {
  return axios
    .post(`${url}/auth/login`, loginUserInfo)
    .then(res => res)
    .catch(err => err);
};

// 성공 + 프로미스화
const signupPost = signUpUserInfo => {
  return axios
    .post(`${url}/auth/join`, signUpUserInfo)
    .then(res => res)
    .catch(err => err);
};

const changeInfoPost = changeInfoPost => {
  console.log('change', changeInfoPost);
  return axios
    .post(`${url}/auth/password`, changeInfoPost)
    .then(res => res)
    .catch(err => err);
};

const emailCheck = email => {
  return axios
    .post(`${url}/auth/email`, { email })
    .then(res => res)
    .catch(err => err);
};

// 성공 (보통 로그아웃시 별다른 이벤트가 없기 때문에 리팩토링 X)
const userLogout = () => {
  console.log('logout');
  localStorage.removeItem('token');
  localStorage.removeItem('nick');
  localStorage.removeItem('profile');

  window.location = '/';
  alert('로그아웃 되었습니다!');
};

// 성공 + 프로미스화
const userDiaryPost = data => {
  console.log('it is', data);

  return axios
    .post(`${url}/post/write`, data, TokenHeader)
    .then(res => res)
    .catch(err => err);
};



const deleteAccountGet = () => {
  return axios
    .get(`${url}/user/delete`, TokenHeader)
    .then(res => res)
    .catch(err => err);
};

const uploadImage = (data, callback) => {
  return axios
    .post(`${url}/post/img`, data, TokenHeader)
    .then(res => res)
    .catch(err => err);
};

// 성공 + 프로미스화
const modifyDiary = modifiedDiary => {
  console.log(modifiedDiary);

  return axios
    .patch(`${url}/post/write`, modifiedDiary, TokenHeader)
    .then(res => res)
    .catch(err => err);
};

// 성공 + 프로미스화
const deleteDiary = obj => {
  return axios
    .delete(`${url}/post/write`, {
      data: obj,
      ...TokenHeader,
    })
    .then(res => res)
    .catch(err => err);
};

// 성공 + 프로미스화
const getData = type => {
  return axios
    .get(`${url}/post/${type}`, TokenHeader)
    .then(res => res)
    .catch(err => err);
};

const getWeather = (city = 'Seoul') => {
  return axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=cb4a47e322fcb2a924c922f9cacb7bca`,
    )
    .then(res => res)
    .catch(err => err);
};

const routeKakaoLogin = () => {
  return axios
    .get(`${url}/api`)
    .then(res => res)
    .catch(err => err);
};

const getUserAllDiary = () => {
  return axios
    .get(`${url}/post`, TokenHeader)
    .then(res => res)
    .catch(err => err);
};

export default {
  loginPost,
  modifyDiary,
  getData,
  deleteDiary,
  userDiaryPost,
  signupPost,
  userLogout,
  uploadImage,
  getWeather,
  routeKakaoLogin,
  emailCheck,

  deleteAccountGet,

  url,
  changeInfoPost,
  getUserAllDiary,
};
