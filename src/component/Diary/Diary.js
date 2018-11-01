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

class Diary extends Component {
  state = {
    data: sampledata,
    hashtag: tagTable,
    filterData: [],
    isClicked: false,
  };

  _onClick(e) {
    const filteredData = this.state.data.filter(data => {
      return data.tag === e;
    });

    this.setState({
      // 비동기구나
      filterData: filteredData,
    });
  }

  _toggle = () => {
    this.setState({
      isClicked: !this.state.isClicked,
    });
  };

  // componentDidMount() {
  //   axios
  //     .get('')
  //     .then(response => {
  //       this.setState({
  //         data: response.data,
  //       });
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }

  render() {
    return (
      <div>
        {!this.state.data.length ? (
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
            {this.state.filterData.length ? (
              <SpecificDiaryList articles={this.state.filterData} />
            ) : null}
          </span>
        )}
      </div>
    );
  }
}

Diary.propTypes = {};

export default Diary;
