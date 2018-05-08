import React, { Component } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import Axes from '../components/Axes';
import data from '../data';
import Bars from './Bars';
import ResponsiveWrapper from './ResponsiveChart';

class Chart extends Component {
  constructor() {
    super();

    this.xScale = scaleBand();
    this.yScale = scaleLinear();
  }

  render() {
    const margins = {
      top: 50,
      right: 20,
      bottom: 100,
      left: 60,
    };

    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 400),
      height: 500,
    };
    const maxValue = Math.max(...data.map((d) => d.value));

    const xScale = this.xScale
      .padding(0.5)
      .domain(data.map((d) => d.title))
      .range([margins.left, svgDimensions.width - margins.right]);

    const yScale = this.yScale
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top]);

    const common = {
      scales: { xScale, yScale },
      margins,
      svgDimensions,
    };

    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        <Axes {...common} />
        <Bars
          {...common}
          data={data}
          maxValue={maxValue}
        />
      </svg>
    );
  }
}

export default ResponsiveWrapper(Chart);
