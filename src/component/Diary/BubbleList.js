import React from 'react';
import Bubble from './Bubble';

export default props => (
  <div>
    {props.tags.map((tag, idx) => {
      return <Bubble tag={tag} key={idx} clickFunc={props.clickFunc} />;
    })}
  </div>
);
