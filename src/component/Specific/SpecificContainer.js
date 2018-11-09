import React, { Component } from 'react';
import Specific from 'component/Specific/Specific';
import api from 'api/api';

export default class SpecificContainer extends Component {
  state = {
    data: [],
  };

  _getUserAllData = async () => {
    const allData = await api.getUserAllDiary();

    if (allData.status === 200) {
      this.setState({
        data: this.state.data.concat(allData.data),
      });
    } else {
      alert('에러!');
    }
  };

  componentDidMount() {
    this._getUserAllData();
  }

  render() {
    return (
      <div id="SpecificContainer">
        {this.state.data.map((article, idx) => {
          return <Specific currentDiary={article} key={idx} />;
        })}
      </div>
    );
  }
}
