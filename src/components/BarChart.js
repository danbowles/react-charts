import React, { Component } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import PropTypes from 'prop-types';
import Axes from '../components/Axes';
import Bars from './Bars';
import ResponsiveChart from './ResponsiveChart';

class BarChart extends Component {
  constructor() {
    super();

    this.xScale = scaleBand();
    this.yScale = scaleLinear();
  }

  render() {
    const {
      margins,
      height = 500,
      parentWidth,
      data,
    } = this.props;

    const maxValue = Math.max(...data.map((d) => d.value));
    const width = Math.max(parentWidth, (this.props.width || 400));

    const xScale = this.xScale
      .padding(0.4)
      .domain(data.map((d) => d.title))
      .range([margins.left, width - margins.right]);

    const yScale = this.yScale
      .domain([0, maxValue])
      .range([height - margins.bottom, margins.top]);

    const common = {
      scales: { xScale, yScale },
      margins,
      svgDimensions: { width, height },
    };

    const axesLabels = {
      xLabel: 'Series',
      yLabel: 'Amount',
    }

    return (
      <svg width={width} height={height}>
        <Axes {...common} {...axesLabels} />
        <Bars
          {...common}
          data={data}
          maxValue={maxValue}
        />
      </svg>
    );
  }
}

BarChart.propTypes = {
  margins: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
  }).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  parentWidth: PropTypes.number.isRequired,
  data: PropTypes.shape.isRequired,
}

export default ResponsiveChart(BarChart);
