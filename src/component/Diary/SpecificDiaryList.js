import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SpecificDiary from './SpecificDiary';
import './diary.css';

class SpecificDiaryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modify: false,
      nestedModal: false,
      closeAll: false,
      current: [],
    };

    this.toggle = this.toggle.bind(this);
    this.modify = this.modify.bind(this);
    this.toggleModify = this.toggleModify.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this._selectIndex = this._selectIndex.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleModify() {
    this.setState({
      modify: !this.state.modify,
    });
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false,
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true,
    });
  }

  modify(arg, width) {
    return !this.state.modify ? (
      this.state.current[arg]
    ) : (
      <input
        type="text"
        value={this.state.current[arg]}
        style={{ width: width }}
      />
    );
  }

  _selectIndex(e) {
    // console.dir(e.currentTarget);
    console.log(e, this.props.articles[e.idx]);
    this.setState({
      current: this.props.articles[e.idx],
    });
    console.log(e, this.state.current);
  }

  render() {
    return (
      <div>
        {this.props.articles.map((article, idx) => {
          return (
            <Button
              color="danger"
              onClick={e => {
                this.toggle();
                this._selectIndex({ idx });
              }}
              style={{ margin: '10px', width: '90%' }}
            >
              <SpecificDiary article={article} key={idx} />;
            </Button>
          );
        })}

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            {this.modify('title', '300px')}
          </ModalHeader>
          <ModalBody>
            <img src={this.state.current.image} width="400px" />
            <br />
          </ModalBody>
          <ModalBody>
            {/* {!this.state.modify ? (
              this.state.current.content
            ) : (
              <input
                type="textarea"
                value={this.state.current.content}
                style={{ width: '450px' }}
              />
            )} */}
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
              {!this.state.modify ? '수정' : '완료'}
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
                <Button color="secondary" onClick={this.toggleAll}>
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

// const SpecificDiarylist = props => (
//   <div className="specific">
//     {props.articles.map((article, idx) => {
//       return <SpecificDiary article={article} key={idx} />;
//     })}

//   </div>
// );

// export default SpecificDiarylist;
