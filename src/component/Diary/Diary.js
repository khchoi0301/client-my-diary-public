import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import SpecificDiaryList from './SpecificDiaryList';
import { Button } from 'reactstrap';
import BubbleList from './BubbleList';
import axios from 'axios';
import { sampledata, tagTable } from '../../sampledata';
// import { resolveComponents } from 'uri-js';
import { Link, Route } from 'react-router-dom';
import NewArticle from './newarticle';
import api from '../../api/api';

class Diary extends Component {
  state = {
    data: null,
    hashtag: null,
    selectedTag: null,
    isClicked: false
  };

  _onClick(tag) {
    console.log(tag);
    api.getData(tag, 'data', (res, state) => {
      this.setState({
        [state]: res.data,
        selectedTag: tag
      });
    });
  }

  _toggle = () => {
    this.setState({
      isClicked: !this.state.isClicked,
    });
  };

  componentDidMount() {
    console.log('mount');
    api.getData('tag', 'hashtag', (res, state) => {
      this.setState({
        [state]: res.data,
      });
    });
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
              <NewArticle toToggle={this._toggle} />
            ) : null}
            <BubbleList
              tags={this.state.hashtag}
              clickFunc={this._onClick.bind(this)}
            />
            {this.state.data ? (
              < SpecificDiaryList articles={this.state.data} tag={this.state.selectedTag} clickFunc={this._onClick.bind(this)} />
            ) : null}
          </span>
        )}
      </div>
    );
  }
}

Diary.propTypes = {};

export default Diary;
