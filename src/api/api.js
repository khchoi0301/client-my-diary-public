import axios from 'axios';
// import { BrowserRouter, Route, Link } from 'react-router-dom';
//13.209.41.118:3001  server
//13.209.41.118:3306  mysql
//http://10.130.151.17:3001 bong
//'http://13.125.244.228:3001'

// http://ec2-13-209-41-118.ap-northeast-2.compute.amazonaws.com:3001/post  get
// http://ec2-13-209-41-118.ap-northeast-2.compute.amazonaws.com:3001/post/id  put jooyeon
const url = 'http://54.191.92.219';


const loginPost = function (email, password) {
  axios
    .post('http://10.130.151.17:3001/auth/login', {
      email: email,
      password: password,
    })
    .then(res => {
      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem('token', token);
        window.location = '/';
      }
    })
    .catch(err => {
      throw err;
    });
};

const modifyDiary = function (obj, callback) {
  console.log('modifyDiary', obj);
  axios
    .put(`${url}/post/${obj.id}`, {
      id_post: obj.id_post,
      title: obj.title,
      email: obj.email,
      content: obj.content,
      weather: obj.weather,
      image: obj.image,
      tag: obj.tag,
      userId: '7'
    })
    .then(res => {
      callback();
    })
    .catch(err => {
      throw err;
    });
};

const deleteDiary = (obj, callback) => {
  axios
    .delete(`${url}/post/${obj.id}`, {
      userId: '7'
    })
    .then(res => {
      callback();
    })
    .catch(err => {
      throw err;
    });
};

const getData = (url, state, callback) => {
  axios
    .get(`http://54.191.92.219/${url}`)
    .then(res => {
      callback(res, state);
    })
    .catch(err => {
      console.error(err);
    });
};

export default { loginPost, modifyDiary, getData, deleteDiary };
