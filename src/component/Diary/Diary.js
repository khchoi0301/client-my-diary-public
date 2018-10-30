import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import SpecificDiaryList from './SpecificDiaryList';
import BubbleList from './BubbleList';
import axios from 'axios';
import { sampledata, tagTable } from '../../sampledata';
import NewArticle from './newarticle';
// import { resolveComponents } from 'uri-js';
import { Link } from 'react-router-dom';

class Diary extends Component {
  state = {
    data: sampledata,
    hashtag: tagTable,
    filterData: [],
    newarticle: false,
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

  newArticle() {
    console.log(1, this);
    this.setState({
      newarticle: true,
    });
    console.log(this.state.newarticle);
  }
  // componentDidMount() {
  //   axios
  //     .get('https://jsonplaceholder.typicode.com/posts/1/comments')
  //     .then(response => {
  //       this.setState({
  //         data: response.data,
  //       });
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  //   console.log(this.state.data);
  // }

  render() {
    return (
      <div>
        {!this.state.data.length ? (
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
            {console.log(this.state.filterData.length)}
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
