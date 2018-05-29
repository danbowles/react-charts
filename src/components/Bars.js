import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';
import BarLabel from './BarLabel';

class Bars extends Component {
  constructor(props) {
    super(props);

    this.colorScale = scaleLinear()
      .domain(props.domain)
      .range(['#CDDC39', '#8BC34A'])
      .interpolate(interpolateLab);
  }

  render() {
    const {
      scales: { xScale, yScale },
      margins: { bottom: bottomMargin },
      data,
      svgDimensions: { height },
    } = this.props;

    const bars = data.map(({ key, value }) => {
      const barHeight = height - bottomMargin - yScale(value);
      return (
        <g key={`${key}{value}`}>
          <rect
            key={key}
            x={xScale(key)}
            y={yScale(value)}
            height={barHeight}
            width={xScale.bandwidth()}
            fill={this.colorScale(value)}
          />
          <BarLabel
            x={xScale(key) + (xScale.bandwidth() / 2)}
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

Bars.propTypes = {
  scales: PropTypes.shape({
    xScale: PropTypes.func,
    yScale: PropTypes.func,
  }).isRequired,
  margins: PropTypes.shape({}).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.number,
  })).isRequired,
  svgDimensions: PropTypes.shape({}).isRequired,
  domain: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default Bars;
