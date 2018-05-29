import React, { Component } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import PropTypes from 'prop-types';
import Axes from '../components/Axes';
import Bars from './Bars';
import ResponsiveChart from './ResponsiveChart';

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.xScale = scaleBand();
    this.yScale = scaleLinear();
  }

  render() {
    const {
      margins,
      height,
      parentWidth,
      data: {
        data = [],
        xAxis,
        yAxis,
      },
    } = this.props;

    const width = parentWidth;

    const xScale = this.xScale
      .padding(xAxis.padding || 0.4)
      .domain(xAxis.domain)
      .range([margins.left, width - margins.right]);

    const yScale = this.yScale
      .domain(yAxis.domain)
      .range([height - margins.bottom, margins.top]);

    const common = {
      scales: { xScale, yScale },
      margins,
      svgDimensions: { width, height },
    };

    const axesLabels = {
      xLabel: xAxis.label,
      yLabel: yAxis.label,
    };

    return (
      <svg width={width} height={height}>
        <Axes {...common} {...axesLabels} />
        <Bars
          {...common}
          data={data}
          domain={yAxis.domain}
        />
      </svg>
    );
  }
}

BarChart.defaultProps = {
  height: 500,
};

BarChart.propTypes = {
  margins: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
  }).isRequired,
  height: PropTypes.number,
  parentWidth: PropTypes.number.isRequired,
  data: PropTypes.shape({}).isRequired,
}

export default ResponsiveChart(BarChart);
