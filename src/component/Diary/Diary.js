import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import SpecificDiaryList from './SpecificDiaryList';
import BubbleList from './BubbleList';
import axios from 'axios';
import { sampledata, tagTable } from '../../sampledata';
import NewArticle from './newarticle';
// import { resolveComponents } from 'uri-js';
import { Link } from 'react-router-dom';
import api from '../../api/api';

class Diary extends Component {
  state = {
    data: null,
    hashtag: null,
    selectedTag: null
  };

  _onClick(tag) {
    api.getData(tag, 'data', (res, state) => {
      this.setState({
        [state]: res.data,
        selectedTag: tag

      });
    });
  }

  componentDidMount() {
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
            <Link to="/newarticle">
              <button className="newbtn">새글쓰기</button>
            </Link>
            <BubbleList
              tags={this.state.hashtag}
              clickFunc={this._onClick.bind(this)}
            />
            {console.log('render', this.state.data)}
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
