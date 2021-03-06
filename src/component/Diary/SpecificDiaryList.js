import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import HorizontalScroll from 'react-scroll-horizontal';
import SpecificDiary from './SpecificDiary';
import './diary.css';
import api from 'api/api';
import MakeTag from './MakeTag';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Time from './Time';
import { Redirect } from 'react-router-dom';
// import Specific from 'component/Specific/Specific';

export default class SpecificDiaryList extends Component {
  state = {
    modal: false,
    modify: false,
    nestedModal: false,
    closeAll: false,
    current: {},
    redirect: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  toggleModify = () => {
    this.setState({
      modify: !this.state.modify,
    });
  };

  toggleNested = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false,
    });
  };

  toggleAll = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true,
    });
  };

  modify = (arg, width) => {
    var obj = this.state.current.tag;

    return !this.state.modify ? ( //modi상태인지
      arg === 'tag' && Array.isArray(this.state.current[arg]) ? (
        this.state.current[arg].map(item => {
          return `#${item} `;
        })
      ) : (
        this.state.current[arg]
      )
    ) : Array.isArray(this.state.current[arg]) ? (
      <MakeTag tag={obj} func={this._onvalueChange} />
    ) : (
      <input
        type="text"
        value={this.state.current[arg]}
        onChange={e => {
          this.setState({
            current: { ...this.state.current, [arg]: e.target.value },
          });
        }}
        style={{ width: width }}
      />
    );
  };

  _selectIndex = e => {
    this.setState({
      current: this.props.articles[e.idx],
    });
  };

  _onModifyButtonClick = async () => {
    let arrayifyHashTag = this.state.current.tag;

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
        this.props.clickFunc(this.props.selectedtag);
        this.props.hashTableUpdate();
        this.toggle();
        this.toggleModify();
      } else {
        alert(`수정에러 !! : ${modifyResult.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  _onDeleteButtonClick = async () => {
    // this.toggleAll();
    const deleteResult = await api.deleteDiary(this.state.current);

    try {
      if (deleteResult.status === 200) {
        this.props.clickFunc(this.props.selectedtag);
        this.props.hashTableUpdate();
      } else {
        alert(`삭제에러!! : ${deleteResult.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  _onvalueChange = tags => {
    this.setState({
      current: { ...this.state.current, tag: tags },
    });
  };

  _renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/specific" />;
    }
  };

  _setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    if (this.state.current.date) {
      console.log('date', this.state.current.date);

      const week = ['일', '월', '화', '수', '목', '금', '토'];
      var date = this.state.current.date.split('T')[0];
      var day = week[new Date(date).getDay()];

      console.log('날짜 출력 ', date, day);
    }

    return (
      <div id="DiaryList">
        <HorizontalScroll pageLock={true} config={{ stiffness: 4, damping: 3 }}>
          {this.props.articles.map((article, idx) => {
            if (!article.img) {
              article.img =
                'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180';
            }
            if (article.content) {
              return (
                <Button
                  className="diarybtn"
                  color="grey"
                  onClick={e => {
                    this.toggle();
                    this._selectIndex({ idx });
                  }}
                  style={{
                    margin: '4px',
                    padding: '2px',
                  }}
                >
                  <SpecificDiary article={article} key={idx} />
                </Button>
              );
            }
          })}
        </HorizontalScroll>
        <Modal
          id="modalselect"
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            {this.modify('title', '300px')}
          </ModalHeader>
          <ModalBody>
            {this.state.current.date ? (
              <span>
                <span>{`${date} (${day})`}</span>
              </span>
            ) : null}
            <span className="weather">{this.state.current.weather}</span>

            <br />
          </ModalBody>
          <ModalBody id="modalImg">
            <img
              alt="User Upload Page"
              src={this.state.current.img}
              width="800px"
            />
            <br />
          </ModalBody>
          <ModalBody>
            {this.modify('content', '450px')}
            <br />
          </ModalBody>
          <ModalBody>
            {this.modify('tag', '450px')}

            <br />
          </ModalBody>
          <ModalFooter>
            <Button
              color="info"
              onClick={() => {
                this.props.appStateChange(this.state.current);
                this._setRedirect();
              }}
            >
              상세보기
            </Button>
            {this.state.redirect ? this._renderRedirect() : null}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
