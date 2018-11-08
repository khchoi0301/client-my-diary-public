import React, { Component } from 'react';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  CustomInput,
} from 'reactstrap';
import api from 'api/api';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import MakeTag from './MakeTag';
import DetailHeader from './DetailHeader';
import 'react-dates/lib/css/_datepicker.css';
import './NewDiary.css';

export default class NewArticle extends Component {
  state = {
    title: '',
    content: '',
    date: moment(),
    weather: '',
    hashtag: [],
    key: '',
    img: '',
    isUploadImg: false,
  };

  _handleSubmit = e => {
    const arrayifyHashTag = this.state.hashtag.map(item => {
      return item.label;
    });

    const postDiaryData = {
      ...this.state,
      hashtag: arrayifyHashTag,
    };

    console.log('postDiaryData', postDiaryData);

    e.preventDefault();
    api
      .userDiaryPost(postDiaryData)
      .then(res => {
        if (res.status === 200) {
          console.log(postDiaryData);
          alert('등록되었습니다!');
          //   <Redirect to ="/"/>
        } else {
          alert('실패!');
        }
      })
      .catch(err => console.error(err));
  };

  _setHashtagState = hashtags => {
    const changed = hashtags.map(text => {
      return { label: text, value: text };
    });
    const newtag = this.state.hashtag.concat(changed);
    console.log(newtag);

    this.setState({
      hashtag: newtag,
    });
  };

  _sendImage = () => {
    let imageForm = new FormData();

    imageForm.append('img', document.getElementById('file').files[0]);
    api
      .uploadImage(imageForm)
      .then(data => {
        const imgData = data.data;

        console.log('working!');

        this._setHashtagState(imgData.tag);
        this.setState({
          img: imgData.img,
          key: imgData.key,
          isUploadImg: false,
        });
      })
      .catch(err => console.error(err));
  };

  _onChangeAttr = (e, attr) => {
    this.setState({
      [attr]: e.target.value,
    });
  };

  _onvalueChange = tags => {
    this.setState({ hashtag: tags });
    console.log('tag', this.state.hashtag);
  };

  async componentDidMount() {
    const getWeatherData = await api.getWeather('Seoul');

    try {
      const userLocationArea = getWeatherData.data.weather[0].main;
      this.setState({
        weather: userLocationArea,
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    console.log('render', this.state);
    const { isUploadImg } = this.state;

    return (
      <div id="NewDiary">
        <DetailHeader
          handleSubmit={this._handleSubmit}
          isUploadImg={isUploadImg}
          postInfo={this.state}
        />
        <Form className="form" onSubmit={this._handleSubmit}>
          <FormGroup row>
            <Label for="exampleTitle" sm={2}>
              제목
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="title"
                id="exampletitle"
                placeholder="제목"
                onChange={e => {
                  this._onChangeAttr(e, 'title');
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} for="exampleTag">
              날짜
            </Label>
            <Col sm={9}>
              <FormGroup>
                <SingleDatePicker
                  date={this.state.date} // momentPropTypes.momentObj or null
                  onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                  focused={this.state.focused} // PropTypes.bool
                  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                  id="your_unique_id" // PropTypes.string.isRequired,
                  isOutsideRange={() => false}
                />
              </FormGroup>
            </Col>
            <Label sm={2} for="exampleTag">
              날씨
            </Label>
            <Col sm={9}>
              <FormGroup>
                <CustomInput
                  type="select"
                  id="CustomSelect"
                  name="customSelect"
                  onChange={e => {
                    this.setState({
                      weather: e.target.value,
                    });
                  }}
                >
                  <option>{this.state.weather}</option>
                  <option>Thunderstorm</option>
                  <option>Drizzle</option>
                  <option>Rain</option>
                  <option>Snow</option>
                  <option>Clear</option>
                  <option>Clouds</option>
                </CustomInput>
              </FormGroup>
            </Col>
            <Label for="exampleText" sm={2}>
              내용
            </Label>
            <Col sm={9}>
              <Input
                type="textarea"
                name="text"
                id="exampleText"
                placeholder="내용을 입력하세요."
                style={{ height: '300px' }}
                onChange={e => {
                  this._onChangeAttr(e, 'content');
                }}
              />
            </Col>
          </FormGroup>
          <Row form>
            <Label sm={2} for="exampleTag">
              태그
            </Label>
            <Col sm={9}>
              <FormGroup>
                <MakeTag tag={this.state.hashtag} func={this._onvalueChange} />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup row>
            <Label for="exampleFile" sm={2}>
              사진
            </Label>
            <Col sm={10}>
              <CustomInput
                type="file"
                id="file"
                name="file"
                label="등록은 한장만 가능합니다!"
                onChange={() => {
                  this.setState({
                    isUploadImg: !this.state.isUploadImg,
                  });
                  console.log('Imagechanging');
                  this._sendImage();
                }}
              />
            </Col>
          </FormGroup>
        </Form>
        {this.state.img ? (
          <img className="image" src={this.state.img} alt="이미지" />
        ) : null}
      </div>
    );
  }
}
