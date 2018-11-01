// window.location 문제 해결해야함!!
import axios from 'axios';

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

const signupPost = (email, nick, password) => {
  axios
    .post(
      'http://ec2-13-209-41-118.ap-northeast-2.compute.amazonaws.com:3001/auth/join',
      {
        email: email,
        nick: nick,
        password: password,
      },
    )
    .then(res => {
      if (res.status === 200) {
        window.location = '/';
      }
    })
    .catch(err => {
      throw err;
    });
};

export default { loginPost, signupPost };
