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

  _changeTitle = () => {
    document.title = 'My Diary';
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

  _showAll = () => {
    this.setState({
      selectedTag: ''
    });
  }
  componentDidMount() {
    this._onClick('');
    this._hashTableUpdate();
  }

  render() {
    console.log('불러온 데이터 : ', this.state.data);

    this._changeTitle();
    return (
      <div id='Diary'>
        {!this.state.hashtag ? (
          <p> loading... </p>
        ) :
          <span>
            <div className='btns'>
              <Button className="show newbtn" onClick={this._toggle}>
                새글쓰기
              </Button>
              <Button className="show All" onClick={() => { console.log('hi'); this._onClick(''); }} >
                Show All
              </Button>

            </div>
            {this.state.isClicked ? (
              <NewArticle
                toToggle={this._toggle}
                postUpdate={this._postDataUpdate}
                hashTableUpdate={this._hashTableUpdate}
                getWeather={api.getWeather}
              />
            ) : null}
            <BubbleList tags={this.state.hashtag} clickFunc={this._onClick} />
            <SpecificDiaryList
              articles={this.state.data}
              selectedtag={this.state.selectedTag}
              clickFunc={this._onClick}
              hashTableUpdate={this._hashTableUpdate}
            />
          </span>
        }
      </div>
    );
  }
}
