import React, { Component } from 'react';
import auth from 'utils/auth';

export default class Main extends Component {

  state = {
    isLogined: {},
  };

  async componentDidMount() {
    if (!localStorage.getItem('token')) {
      const { isLogined } = this.state;
      this.setState({
        isLogined: {
          code: 407,
          message: '잘못된 회원입니다.',
          ...isLogined,
        },
      });
    } else {
      const checking = await auth.userCheck();
      console.log(checking);
      if (checking.code !== 200) {
        localStorage.removeItem('token');
        alert('로그인 만료! 재로그인 해주세요');
      }
      this.setState({
        isLogined: checking,
      });
    }
    document.title = 'My Log';

  }


  render() {
    return (
      <div id="main">
        <img alt="ourService" src="https://picsum.photos/600/400?image=123" />
      </div>
    );
  }
}
