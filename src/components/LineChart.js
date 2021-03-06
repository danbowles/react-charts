import React, { Component } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import PropTypes from 'prop-types';
import Axes from '../components/Axes';
import Line from '../components/Line';
import ResponsiveChart from './ResponsiveChart';

class LineChart extends Component {
  constructor() {
    super();

    this.xScale = scaleBand();
    this.yScale = scaleLinear();
  }

  render() {
    const {
      margins,
      height,
      parentWidth,
      data,
    } = this.props;

    const maxValue = Math.max(...data[0].map((d) => d.value));
    const width = parentWidth;

    const xScale = this.xScale
      .domain(data[0].map((d, i) => i))
      .range([margins.left, width - margins.right]);

    const yScale = this.yScale
      .domain([0, maxValue + 10])
      .range([height - margins.bottom, margins.top]);

    const common = {
      scales: { xScale, yScale },
      margins,
      svgDimensions: { width, height },
    };

    const axesLabels = {
      xLabel: 'Other Series',
      yLabel: 'Other Amount',
    };

    return (
      <svg width={width} height={height}>
        <Axes {...common} {...axesLabels} />
        {data.map((lineData) => (
          <Line
            key={Math.random()}
            {...common}
            data={lineData}
          />
        ))}
      </svg>
    );
  }
}

LineChart.defaultProps = {
  height: 500,
}

LineChart.propTypes = {
  margins: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
  }).isRequired,
  height: PropTypes.number,
  parentWidth: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
}

export default ResponsiveChart(LineChart);
