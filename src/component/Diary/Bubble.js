import React from 'react';

export default props => {
  return (
    <div className="bubble"
      onClick={() => {
        props.clickFunc(props.tag.tag);
      }}
    >
      {props.tag.tag}
      ({props.tag.count})
    </div>
  );
};
