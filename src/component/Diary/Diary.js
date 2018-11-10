import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import SpecificDiaryList from './SpecificDiaryList';
import BubbleList from './BubbleList';
import api from 'api/api';

export default class Diary extends Component {
  state = {
    data: [],
    hashtag: [],
    selectedTag: null,
    isClicked: false,
    golist: false,
  };

  _changeTitle = () => {
    document.title = 'My Diary';
    console.log('diary : ', this.props);
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

  _toggle = attr => {
    this.setState({
      [attr]: !this.state.attr,
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
      selectedTag: '',
    });
  };

  componentDidMount() {
    this._onClick('');
    this._hashTableUpdate();
  }

  render() {
    console.log('불러온 데이터 : ', this.state.data);

    this._changeTitle();
    return (
      <div id="Diary">
        {!this.state.hashtag ? (
          <p> loading... </p>
        ) : (
          <span id="Diaryspan">
            {this.state.isClicked ? <Redirect to="/post" /> : null}
            {/* <BubbleList tags={this.state.hashtag} clickFunc={this._onClick} /> */}

            <BubbleList tags={this.state.hashtag} clickFunc={this._onClick} />
            <div className="btns">
              <Button
                className="show newbtn"
                onClick={() => this._toggle('isClicked')}
              >
                새글쓰기
              </Button>
              {this.state.isClicked ? <Redirect to="/post" /> : null}
              <Button
                className="show All"
                onClick={() => {
                  console.log('hi');
                  this._onClick('');
                }}
              >
                Show All
              </Button>
            </div>
            <SpecificDiaryList
              articles={this.state.data}
              selectedtag={this.state.selectedTag}
              clickFunc={this._onClick}
              hashTableUpdate={this._hashTableUpdate}
              appStateChange={this.props.appStateChange}
            />
          </span>
        )}
      </div>
    );
  }
}
