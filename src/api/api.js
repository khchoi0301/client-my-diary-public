import axios from 'axios';
// import { BrowserRouter, Route, Link } from 'react-router-dom';

var loginPost = function(email, password) {
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

export default loginPost;
