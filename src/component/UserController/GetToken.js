import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export default class GetToken extends Component {
  state = {
    isGetToken: false,
  };

  _getKakaoToken = () => {
    const token = this.props.match.params.token;

    console.log('kakao token', token);
    if (token) {
      localStorage.setItem('token', token);
    } else alert('에러!!');
  };

  componentDidMount() {
    const { isGetToken } = this.state;
    this._getKakaoToken();
    this.setState({
      isGetToken: !isGetToken,
    });
  }

  render() {
    return <div>{this.state.isGetToken ? <div /> : <Redirect to="/" />}</div>;
  }
}
