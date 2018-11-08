import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Input } from 'reactstrap';
import Diary from 'component/Diary/Diary';
import Main from 'component/Main/Main';
import SignUp from 'component/UserController/SignUp';
import Login from 'component/UserController/Login';
import GetToken from 'component/UserController/GetToken';
import PrivateRouter from 'component/UserController/privateRoute';
import NewDiary from 'component/Detail/NewDiary';
import Mainheader from 'component/Main/MainHeader';
import Specific from 'component/Specific/Specific';
import MakeTag from 'component/Diary/MakeTag';
import Modify from 'component/Detail/Modify';
import api from 'api/api';

export default class App extends Component {
  state = {
    currentDiary: {
      content:
        '반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.반갑습니다.',
      createdAt: '2018-11-08T08:49:53.000Z',
      date: '2018-09-12T03:00:00.000Z',
      id: 143,
      img:
        'https://mydiarystorage.s3.ap-northeast-2.amazonaws.com/original/1541666985150504849564852505149504953515549535254495146106112103',
      key:
        'original/1541666985150504849564852505149504953515549535254495146106112103',
      tag: ['ㅋㅋ', '전자제품', '노트북'],
      title: '테스트용2',
      updatedAt: '2018-11-08T08:49:53.000Z',
      weather: 'Rain',
    },
    focused: false,
    clickModified: false,
  };

  _getCurrentDiarty = curDiary => {
    console.log('실행 되라!', curDiary);

    this.setState({
      currentDiary: curDiary,
    });
  };

  _onDeleteButtonClick = async () => {
    const deleteResult = await api.deleteDiary(this.state.currentDiary);

    try {
      if (deleteResult.status === 200) {
        console.log(deleteResult);

        alert('삭제 되었습니다!');
        this.setState({
          currentDiary: {},
        });
      } else {
        alert(`삭제에러!! : ${deleteResult.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  _setHashtagState = hashtags => {
    const changed = hashtags.map(text => {
      return text;
    });

    const newtag = this.state.currentDiary.tag.concat(changed);

    this.setState({
      tag: newtag,
    });
  };

  _sendImage = () => {
    let imageForm = new FormData();

    console.log(this.state.currentDiary.img);

    imageForm.append('img', document.getElementById('file').files[0]);
    api
      .uploadImage(imageForm)
      .then(data => {
        const imgData = data.data;

        console.log('working!', imgData);

        this._setHashtagState(imgData.tag);
        this.setState({
          currentDiary: {
            ...this.state.currentDiary,
            img: imgData.img,
            key: imgData.key,
          },
        });
        console.log(this.state.currentDiary.img);
      })
      .catch(err => console.error(err));
  };

  _onModifyButtonClick = async () => {
    let arrayifyHashTag = this.state.currentDiary.tag;

    if (arrayifyHashTag.length && arrayifyHashTag[0].label) {
      arrayifyHashTag = this.state.current.tag.map(item => {
        return item.label;
      });
    }

    const modifiedDiaryData = {
      ...this.state.current,
      tag: arrayifyHashTag,
    };

    const modifyResult = await api.modifyDiary(modifiedDiaryData);

    try {
      if (modifyResult.status === 200) {
        alert('수정되었습니다');
        this.setState({
          currentDiary: modifiedDiaryData,
        });
        // this.props.clickFunc(this.props.selectedtag);
        // this.props.hashTableUpdate();
        // this.toggle();
        // this.toggleModify();
      } else {
        alert(`수정에러 !! : ${modifyResult.status}`);
      }
    } catch (err) {
      console.error('수정에러 : ', err);
    }
  };

  _onvalueChange = tags => {
    this.setState({
      currentDiary: { ...this.state.currentDiary, tag: tags },
    });
  };

  _modify = (arg, width, ...style) => {
    const obj = this.state.currentDiary.tag;

    return Array.isArray(this.state.currentDiary[arg]) ? (
      <MakeTag tag={obj} func={this._onvalueChange} />
    ) : (
      <Input
        type="text"
        value={this.state.currentDiary[arg]}
        onChange={e => {
          this.setState({
            currentDiary: { ...this.state.currentDiary, [arg]: e.target.value },
          });
        }}
        style={{ width: width }}
      />
    );
  };

  _onChangeState = (attr, value) => {
    this.setState({
      currentDiary: { ...this.state.currentDiary, [attr]: value },
    });
  };

  _modifyDiary = () => {
    api
      .modifyDiary(this.state.currentDiary)
      .then(res => {
        if (res.status === 200) {
          console.log(res);

          alert('수정 성공!');
        } else {
          alert('수정 실패!');
        }
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Mainheader />
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <PrivateRouter path="/post" component={NewDiary} />
            <PrivateRouter
              path="/diary"
              component={Diary}
              appStateChange={this._getCurrentDiarty}
            />
            <Route path="/user/:token" component={GetToken} />
            <Route
              path="/specific"
              render={() => (
                <Specific
                  currentDiary={this.state.currentDiary}
                  deleteDiary={this._onDeleteButtonClick}
                  changeState={this._onChangeState}
                />
              )}
            />
            <Route
              path="/modify"
              render={() => (
                <Modify
                  modifyDiary={this._onModifyButtonClick}
                  modify={this._modify}
                  changeState={this._onChangeState}
                  currentDiary={this.state.currentDiary}
                  focused={this.state.focused}
                  sendImg={this._sendImage}
                  sendModify={this._modifyDiary}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
