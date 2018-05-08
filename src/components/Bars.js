import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';

class Bars extends Component {
  constructor(props) {
    super(props);

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range(['#5700B7', '#6889E2'])
      .interpolate(interpolateLab);
  }

  render() {
    const {
      scales: { xScale, yScale},
      margins: { bottom: bottomMargin },
      data,
      svgDimensions: { height },
    } = this.props;

    const bars = data.map(({ title, value }) => (
      <rect
        key={title}
        x={xScale(title)}
        y={yScale(value)}
        height={height - bottomMargin - yScale(value)}
        width={xScale.bandwidth()}
        fill={this.colorScale(value)}
      />
    ));

    return (
      <g>
        {bars}
      </g>
    );
  }
}

export default Bars;
