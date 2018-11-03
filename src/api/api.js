// 정상 통신 이후 작업은 아직 하지 않음
// 이미지, 날씨는 우선 제외하고 테스팅중
import axios from 'axios';

// const url =
//   'http://ec2-13-209-41-118.ap-northeast-2.compute.amazonaws.com:3001'; // 주연님 AWS 서버
const url = 'http://10.130.151.17:3001';
const email = 'test@naver.com';
const TokenHeader = {
  headers: {
    authorization: localStorage.token,
  },
};

// 토큰 발급 성공!
const loginPost = loginUserInfo => {
  axios
    .post(`${url}/auth/login`, loginUserInfo)
    .then(res => {
      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem('token', token);
        alert('환영합니다!');
        window.location = '/';
      } else {
        console.dir(res);
        alert('에러가 있어요');
      }
    })
    .catch(err => {
      console.error(err);
    });
};

// 성공
const signupPost = signUpUserInfo => {
  axios
    .post(`${url}/auth/join`, signUpUserInfo)
    .then(res => {
      if (res.status === 200) {
        alert('성공');
      } else {
        console.dir(res);
        alert('실패');
      }
    })
    .catch(err => {
      console.error(err);
    });
};

// 성공
const userLogout = () => {
  axios
    .get(`${url}/auth/logout`, TokenHeader)
    .then(res => {
      if (res.status === 200) {
        localStorage.removeItem('token');
        window.location = '/';
      } else {
        console.dir(res);
      }
    })
    .catch(err => {
      console.dir(err);
    });
};

// 성공
const userDiaryPost = (data, callback) => {
  const postingData = {
    ...data,
    img: 'https://picsum.photos/200/300/?random',
  };

  console.log(postingData);

  axios
    .post(`${url}/post/write`, postingData, TokenHeader)
    .then(res => {
      if (res.status === 200) {
        callback(postingData);
        alert('성공!');
      }
    })
    .catch(err => {
      console.error(err);
    });
};

// 성공
const modifyDiary = function (modifiedDiary, callback) {
  console.log(modifiedDiary);

  axios
    .patch(
      `${url}/post/write`,
      {
        ...modifiedDiary,
        img: null,
        key: null,
        weather: 'weatherTest',
      },
      TokenHeader,
    )
    .then(res => {
      callback();
      alert('업데이트 성공!');
      // console.log('Update 성공!');
    })
    .catch(err => {
      console.error(err);
    });
};

// 성공
const deleteDiary = (obj, callback) => {
  axios
    .delete(`${url}/post/write`, {
      data: obj,
      ...TokenHeader,
    })
    .then(() => {
      callback();
      alert('성공!');
    })
    .catch(err => {
      console.error(err);
    });
};

// 성공
const getData = (type, state, callback) => {
  axios
    .get(`${url}/post/${type}`, TokenHeader)
    .then(res => {
      callback(res, state);
    })
    .catch(err => {
      console.error(err);
    });
};

const getWeather = (city = 'Seoul', callback) => {
  axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=cb4a47e322fcb2a924c922f9cacb7bca`)
    .then(res => {
      console.log('weather', res.data.weather[0].main);
      callback(res.data.weather[0].main);
    })
    .catch(err => {
      console.error(err);
    });
};





export default {
  loginPost,
  modifyDiary,
  getData,
  deleteDiary,
  userDiaryPost,
  signupPost,
  userLogout,
  getWeather
};
