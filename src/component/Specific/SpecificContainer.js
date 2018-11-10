import React, { Component } from 'react';
import Specific from 'component/Specific/Specific';
import api from 'api/api';

export default class SpecificContainer extends Component {
  state = {
    data: [],
    clickModified: false,
    list: false,
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

  _handleState = (attr, value) => {
    this.setState({
      [attr]: value,
    });
  };

  componentDidMount() {
    this._getUserAllData();
  }

  render() {
    return (
      <div id="SpecificContainer">
        <br />
        {this.state.data.map((article, idx) => {
          return (
            <Specific
              currentDiary={{
                ...article,
                clickModified: this.state.clickModified,
              }}
              changeState={this._redirectModify}
              appChangeState={this.props.appChangeState}
              deleteDiary={this.props.deleteDiary}
              list={this.state.list}
              handleState={this._handleState}
              key={idx}
            />
          );
        })}
      </div>
    );
  }
}
