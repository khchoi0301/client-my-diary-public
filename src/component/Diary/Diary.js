import React, { Component } from 'react';
import { Button } from 'reactstrap';
import SpecificDiaryList from './SpecificDiaryList';
import BubbleList from './BubbleList';
import NewArticle from './newarticle';
import api from 'api/api';

export default class Diary extends Component {
  state = {
    data: [],
    hashtag: [],
    selectedTag: null,
    isClicked: false,
  };

  _hashTableUpdate = () => {
    api
      .getData('tag')
      .then(res => {
        this.setState({
          hashtag: res.data,
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  _onClick = async tag => {
    const tagData = await api.getData(tag);

    try {
      this.setState({
        data: tagData.data,
        selectedTag: tag,
      });
    } catch (err) {
      console.error(err);
    }
  };

  _toggle = () => {
    this.setState({
      isClicked: !this.state.isClicked,
    });
  };

  // 유저가 클릭한 태그의 데이터 리스트가 아래 깔려있는 상태에서
  // 복잡하긴 하지만 일단 기능 구현...
  _postDataUpdate = postingData => {
    const { data, selectedTag } = this.state;

    if (postingData.hashtag && selectedTag) {
      const isUserPostingTagIn = postingData.hashtag.findIndex(
        tag => tag === selectedTag,
      );

      if (isUserPostingTagIn !== -1) {
        console.log('돌아라!');

        this.setState({
          data: data.concat(postingData),
        });
      }
    }
  };

  componentDidMount() {
    this._hashTableUpdate();
  }

  render() {
    return (
      <div>
        {!this.state.hashtag ? (
          <p> loading... </p>
        ) : (
          <span>
            <Button className="newbtn" onClick={this._toggle}>
              새글쓰기
            </Button>
            {this.state.isClicked ? (
              <NewArticle
                toToggle={this._toggle}
                postUpdate={this._postDataUpdate}
                hashTableUpdate={this._hashTableUpdate}
                getWeather={api.getWeather}
              />
            ) : null}
            <BubbleList tags={this.state.hashtag} clickFunc={this._onClick} />
            {this.state.data ? (
              <SpecificDiaryList
                articles={this.state.data}
                tag={this.state.selectedTag}
                clickFunc={this._onClick}
                hashTableUpdate={this._hashTableUpdate}
              />
            ) : null}
          </span>
        )}
      </div>
    );
  }
}
