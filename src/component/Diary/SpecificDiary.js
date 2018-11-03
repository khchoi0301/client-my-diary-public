import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

const SpecificDiary = props => (
  // <div className='diary'>
  //   <div>{props.article.title}</div>
  //   <div>{props.article.email}</div>
  //   <div>{props.article.content}</div>
  // </div>

  <div className="diary">
    <Card>
      <CardImg
        top
        src={props.article.img}
        width="70px"
        height="70px"
        alt="Card image cap"
      />
      <CardBody>
        <CardTitle>{props.article.title}</CardTitle>
        <CardSubtitle>{props.article.email}</CardSubtitle>
        <CardText>{props.article.content}</CardText>
      </CardBody>
    </Card>
  </div>
);

export default SpecificDiary;
