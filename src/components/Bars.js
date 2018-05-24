import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';
import BarLabel from './BarLabel';

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

    const bars = data.map(({ title, value }) => {
      const barHeight = height - bottomMargin - yScale(value);
      return (
        <g>
          <rect
            key={title}
            x={xScale(title)}
            y={yScale(value)}
            height={barHeight}
            width={xScale.bandwidth()}
            fill={this.colorScale(value)}
          />
          <BarLabel
            x={xScale(title) + (xScale.bandwidth() / 2)}
            y={yScale(value) + ((barHeight < 26) ? -20 : 2)}
            text={value}
            outside={barHeight < 26}
          />
        </g>
      );
    });

    return (
      <g>
        {bars}
      </g>
    );
  }
}

export default Bars;
