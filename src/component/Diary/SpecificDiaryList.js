import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SpecificDiary from './SpecificDiary';
import './diary.css';
import api from '../../api/api';
import InfiniteScroll from 'react-infinite-scroller';
import HorizontalScroll from 'react-scroll-horizontal';

class SpecificDiaryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modify: false,
      nestedModal: false,
      closeAll: false,
      current: {}, //
    };

    this.toggle = this.toggle.bind(this);
    this.modify = this.modify.bind(this);
    this.toggleModify = this.toggleModify.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this._selectIndex = this._selectIndex.bind(this);
  }

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

  modify(arg, width) {
    return !this.state.modify ? (
      this.state.current[arg]
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
  }

  _selectIndex(e) {
    this.setState({
      current: this.props.articles[e.idx],
    });
  }

  render() {
    const parent = { width: '60em', height: '100%' };
    return (
      <div className='diaryList'>
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
                className='diarybtn'
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
            <img
              alt="User Upload Page"
              src={this.state.current.image}
              width="400px"
            />
            <br />
          </ModalBody>
          <ModalBody>
            {this.modify('content', '450px')}
            <br />
          </ModalBody>
          <ModalBody>
            #{this.modify('tag', '450px')}
            <br />
            {this.state.current.weather}
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggleModify}>
              {!this.state.modify ? (
                '수정'
              ) : (
                <span
                  onClick={() => {
                    console.log('modifySubmit');
                    api.modifyDiary(this.state.current, () => {
                      console.log('tag', this.props.tag);
                      this.props.clickFunc(this.props.tag);
                    });
                    this.toggle();
                  }}
                >
                    완료
                </span>
              ) /**/}
            </Button>{' '}
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
                <Button
                  color="danger"
                  onClick={() => {
                    this.toggleAll();
                    api.deleteDiary(this.state.current, () => {
                      console.log('tag', this.props.tag);
                      this.props.clickFunc(this.props.tag);
                    });
                  }}
                >
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

export default SpecificDiaryList;

