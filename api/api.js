import axios from 'axios';

var loginPost = function(email, password) {
  axios
    .post('http://10.130.151.17:3001/auth/login', {
      email: email,
      password: password,
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      throw err;
    });
};

module.exports = { loginPost };
