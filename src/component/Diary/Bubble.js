import React from 'react';

export default props => {
  return (
    <div
      onClick={() => {
        props.clickFunc(props.tag.tag);
      }}
    >
      {props.tag.tag}
    </div>
  );
};
