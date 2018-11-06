// 이미지, 날씨는 우선 제외하고 테스팅중
// 현재 통신에 성공하면 alert, 실패하면 console.error을 띄움. 추후에 어떤 이벤트를 발생할지 생각해야 함.
import axios from 'axios';

<<<<<<< HEAD
// const url = 'http://ec2-13-209-41-118.ap-northeast-2.compute.amazonaws.com:3001'; // AWS 서버
const url = 'http://10.130.151.17:3001'; // 봉균
// const url = 'http://ec2-54-218-47-139.us-west-2.compute.amazonaws.com';

//  /post  method get
=======

// const url =
//   'http://ec2-13-209-41-118.ap-northeast-2.compute.amazonaws.com:3001'; // 주연님 AWS 서버
const url = 'http://ec2-54-218-47-139.us-west-2.compute.amazonaws.com'; // 로컬 서버
// const url = 'http://13.209.41.118:3001'; // EC2 서버
const email = 'test@naver.com';

>>>>>>> 4acaa022e4a1a64f6b644b43e528a8102c621691
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

// 성공 (보통 로그아웃시 별다른 이벤트가 없기 때문에 리팩토링 X)
const userLogout = () => {
  // axios
  // .get(`${url}/auth/logout`, TokenHeader)
  // .then(res => {
  //   if (res.status === 200) {
  localStorage.removeItem('token');
  window.location = '/';
  alert('로그아웃 되었습니다!');
  //   } else {
  //     console.dir(res);
  //   }
  // })
  // .catch(err => {
  //   console.error(err);
  // });
};


// const userDiaryPost = (data, callback) => {
//   // const postingData = {
//   //   ...data,
//   //   img: 'https://picsum.photos/200/300/?random',
//   // };

//   // console.log(postingData);
//   console.log('ppppostingdata', data);

//   axios
//     .post(`${url}/post/write`, data, TokenHeader)
//     .then(res => {
//       if (res.status === 200) {
//         console.log('worked');
//         callback(data);
//         alert('성공!');
//       }
//     })
//     .catch(err => {
//       console.error(err);
//     });
// };


// 성공 + 프로미스화
const userDiaryPost = data => {
  const postingData = {
    ...data,
    // img: 'https://picsum.photos/200/300/?random',
<<<<<<< HEAD
    img: 'https://mydiarystorage.s3.ap-northeast-2.amazonaws.com/original/154147819859720180423121537154613.jpg',
    key: 'original/154147819859720180423121537154613.jpg',
=======
    img:
      'https://mydiarystorage.s3.ap-northeast-2.amazonaws.com/original/154141890822220180423121537154613.jpg',
    key: 'original/154141890822220180423121537154613.jpg',

>>>>>>> 4acaa022e4a1a64f6b644b43e528a8102c621691
  };

  console.log('it is', postingData);

  return axios
    .post(`${url}/post/write`, postingData, TokenHeader)
    .then(res => res)
    .catch(err => err);
};


const uploadImage = (data, callback) => {
  console.log('api.uploadImage called');

  var xhr = new XMLHttpRequest();

  xhr.open('POST', `${url}/post/img`);
  xhr.setRequestHeader('Authorization', localStorage.token);
  xhr.send(data); // 폼 데이터 객체 전송
  xhr.onload = function() {
    if (xhr.status === 200 || xhr.status === 201) {
      console.log(xhr.responseText, 'hahaha');
      callback(xhr.responseText);
    } else {
      console.error(xhr.responseText);
    }
  };
};

// 성공 + 프로미스화
const modifyDiary = modifiedDiary => {
  return axios

    .patch(
      `${url}/post/write`,
      {
        ...modifiedDiary,
        // img: 'https://picsum.photos/200/300/?random',
<<<<<<< HEAD
        img: 'https://mydiarystorage.s3.ap-northeast-2.amazonaws.com/original/154147819859720180423121537154613.jpg',
        key: 'original/154147819859720180423121537154613.jpg',
=======
        img:
          'https://mydiarystorage.s3.ap-northeast-2.amazonaws.com/original/154141890822220180423121537154613.jpg',
        key: 'original/154141890822220180423121537154613.jpg',
>>>>>>> 4acaa022e4a1a64f6b644b43e528a8102c621691
      },
      TokenHeader,
    )
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

};
