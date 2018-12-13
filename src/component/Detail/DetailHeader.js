import React from 'react';
import { Button } from 'reactstrap';
import './DetailHeader.css';
import util from 'utils/util';

export default props => (
  <div id="DetailHeader">
    <Button
      className="button"
      color="success"
      onClick={async e => {
        await props.handleSubmit(e);
        props.isPosted();
      }}
      disabled={props.isUploadImg ? true : false}
    >
      등록
    </Button>
    <div className="date">{util.getToday()}</div>
    <hr className="detailBar" />
  </div>
);
