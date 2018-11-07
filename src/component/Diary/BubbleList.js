import React, { Component } from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';

// export default props => (
//   <div>
//     {/* <iframe src="./test/index.html" width="100%" height="600px"></iframe> */}
//     {props.tags.map((tag, idx) => {
//       return <Bubble tag={tag} key={idx} clickFunc={props.clickFunc} />;
//     })}
//   </div>
// );

export default class BubbleList extends Component {
  bubbleClick = label => {
    this.props.clickFunc(label);
    console.log('Custom bubble click func', label);
  };
  legendClick = label => {
    this.props.clickFunc(label);
    console.log('Customer legend click func', label);
  };

  render() {
    return (
      <span id="TagList">
        <br />
        <BubbleChart
          width={1000}
          height={550}
          graph={{
            zoom: 0.65,
            offsetX: +0.3, // -0.05 means that the offset is -5% of the graph width.
            offsetY: -0.0,
          }}
          fontFamily="Arial"
          data={this.props.tags}
          showLegend={true} // optional value, pass false to disable the legend.
          legendPercentage={20} // number that represent the % of with that legend going to use.
          legendFont={{
            family: 'Arial',
            size: 12,
            color: '#000',
            weight: 'bold',
          }}
          valueFont={{
            family: 'Arial',
            size: 12,
            color: '#fff',
            weight: 'bold',
          }}
          labelFont={{
            family: 'Arial',
            size: 18,
            color: '#fff',
            weight: 'bold',
          }}
          bubbleClickFun={this.bubbleClick}
          legendClickFun={this.legendClick}
        />
      </span>
    );
  }
}
