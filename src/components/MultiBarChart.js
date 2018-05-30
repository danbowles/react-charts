import React, { Component } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import PropTypes from 'prop-types';
import Axes from '../components/Axes';
import Bars from './Bars';
import Legend from './Legend';
import ResponsiveChart from './ResponsiveChart';

class MultiBarChart extends Component {
  constructor(props) {
    super(props);

    this.xBarScale = scaleBand();
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
        keys,
        xAxis,
        yAxis,
        colors,
      },
    } = this.props;

    const width = parentWidth;

    const xScale = this.xScale
      .padding(xAxis.padding || 0.1)
      .domain(xAxis.domain)
      .range([margins.left, width - margins.right]);

    const xBarScale = this.xBarScale
      .padding(0.05)
      .domain(keys)
      .rangeRound([0, xScale.bandwidth()]);

    const yScale = this.yScale
      .domain(yAxis.domain)
      .range([height - margins.bottom, margins.top]).nice();

    const common = {
      scales: { xScale, yScale },
      margins,
      svgDimensions: { width, height },
    };

    const axesLabels = {
      xLabel: xAxis.label,
      yLabel: yAxis.label,
    };

    const barGroups = data.map((barGroupData) => {
      return (
        <g className="barsGroup" transform={`translate(${xScale(barGroupData.key)}, 0)`}>
          <Bars
            data={barGroupData.values}
            scales={{ xScale: xBarScale, yScale }}
            margins={margins}
            svgDimensions={common.svgDimensions}
            colors={colors}
          />
        </g>
      );
    })

    return (
      <svg width={width} height={height}>
        <Axes {...common} {...axesLabels} />
        {barGroups}
        <Legend {...{ colors, keys, width }} />
      </svg>
    );
  }
}

MultiBarChart.defaultProps = {
  height: 500,
};

MultiBarChart.propTypes = {
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

export default ResponsiveChart(MultiBarChart);
