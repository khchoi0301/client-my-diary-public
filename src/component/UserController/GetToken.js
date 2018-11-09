import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import queryString from 'query-string';

export default class GetToken extends Component {
  state = {
    isGetKakaoData: false,
  };

  _getKakaoToken = () => {
    const userInfo = queryString.parse(this.props.location.search);

    console.log('kakao token', userInfo.token);
    if (userInfo.token) {
      localStorage.setItem('token', userInfo.token);
      localStorage.setItem('nick', userInfo.nick);
      localStorage.setItem('profile', userInfo.profile);
    } else alert('에러!!');
  };

  componentDidMount() {
    const { isGetKakaoData } = this.state;
    this._getKakaoToken();
    this.setState({
      isGetKakaoData: !isGetKakaoData,
    });
  }

  render() {
    return <div>{this.state.isGetToken ? <div /> : <Redirect to="/" />}</div>;
  }
}
