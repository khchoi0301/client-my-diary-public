import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import HorizontalScroll from 'react-scroll-horizontal';
import SpecificDiary from './SpecificDiary';
import './diary.css';
import api from 'api/api';
import MakeTag from './MakeTag';

export default class SpecificDiaryList extends Component {
  state = {
    modal: false,
    modify: false,
    nestedModal: false,
    closeAll: false,
    current: {},
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
    let obj = this.state.current.tag;
    if (obj && !obj[0].label) {
      obj = this.state.current.tag.map(text => {
        return { label: text, value: text };
      });
    }

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

    if (arrayifyHashTag[0].label) {
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
    this.toggleAll();
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

  render() {
    // const parent = { width: '60em', height: '100%' };
    return (
      <div className="diaryList">
        {/* <InfiniteScroll
          pageStart={0}
          // loadMore={loadFunc}
          hasMore={true}
          loader={<div className="loader" key={0}>Loading ...</div>}
          useWindow={false}
        >
        </InfiniteScroll> */}
        <HorizontalScroll
          pageLock={true}
          // style={object}
          config={{ stiffness: 4, damping: 3 }}
          // className={string}
        >
          {this.props.articles.map((article, idx) => {
            return (
              <Button
                className="diarybtn"
                color="grey"
                onClick={e => {
                  this.toggle();
                  this._selectIndex({ idx });
                }}
                style={{ margin: '4px', padding: '2px' }}
              >
                <SpecificDiary article={article} key={idx} />
              </Button>
            );
          })}
        </HorizontalScroll>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            {this.modify('title', '300px')}
          </ModalHeader>
          <ModalBody>
            {this.state.current.weather}
            <br />
          </ModalBody>
          <ModalBody>
            <img
              alt="User Upload Page"
              src={this.state.current.img}
              width="400px"
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
            {!this.state.modify ? (
              <Button color="success" onClick={this.toggleModify}>
                수정
              </Button>
            ) : (
              <Button color="success" onClick={this._onModifyButtonClick}>
                완료
              </Button>
            )}
            <Button color="danger" onClick={this.toggleNested}>
              삭제
            </Button>
            <Modal
              isOpen={this.state.nestedModal}
              toggle={this.toggleNested}
              onClosed={this.state.closeAll ? this.toggle : undefined}
            >
              <ModalHeader>삭제</ModalHeader>
              <ModalBody>정말 삭제 하시겠습니까??</ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={this._onDeleteButtonClick}>
                  삭제
                </Button>
                <Button color="primary" onClick={this.toggleNested}>
                  취소
                </Button>{' '}
              </ModalFooter>
            </Modal>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
