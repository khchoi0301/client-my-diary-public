import axios from 'axios';
// import { BrowserRouter, Route, Link } from 'react-router-dom';

const url = 'http://ec2-54-191-92-219.us-west-2.compute.amazonaws.com';
const email = 'wow@gmail.com';

const loginPost = (email, password) => {
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

const mockPost = data => {
  axios
    .post(`${url}/post`, {
      ...data,
      image: 'https://picsum.photos/200/300/?random',
      email: email,
      userId: '8',
      id_post: 2,
    })
    .then(res => {
      res.status === 201 ? alert('성공') : alert('실패');
    })
    .catch(err => {
      throw err;
    });
};

export default { loginPost, mockPost };
