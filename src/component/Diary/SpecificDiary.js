import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';

const SpecificDiary = props => (
  < div id="Specificdiary" >
    < Card >
      <CardImg
        top
        src={props.article.img}
        width="70px"
        height="70px"
        alt="Card image cap"
      />

      <CardBody>
        <CardTitle>
          {props.article.title.substring(0, 9)}
          {props.article.content[9] ? '...' : null}
        </CardTitle>
        <CardSubtitle>{}</CardSubtitle>
        <CardText>
          {props.article.content.substring(0, 20)}
          {props.article.content[20] ? '...' : null}
        </CardText>
      </CardBody>
    </Card >
  </div >
);

export default SpecificDiary;
