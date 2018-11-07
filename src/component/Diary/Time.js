import React from 'react';
import ReactTimeAgo from 'react-time-ago';

const Time = (props) => {
  return (
    <span>
      <ReactTimeAgo locale="en">
        {props.date}
      </ReactTimeAgo>
    </span>
  );
};


export default Time;
