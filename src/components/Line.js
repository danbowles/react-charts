import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { line as d3Line, curveBasis } from 'd3-shape';
import './Line.css';

class Line extends Component {
  constructor(props) {
    super(props);

    console.log('');
  }

  render() {
    const lineGenerator = d3Line();

    const {
      scales: { xScale, yScale},
      margins: { bottom: bottomMargin },
      data,
      svgDimensions: { height },
    } = this.props;

    lineGenerator
      .x(function(d, i) {
        return xScale(i);
      })
      .y(function(d) {
        return yScale(d.value)
      })
      .curve(curveBasis);

    const lineWithData = lineGenerator(data);

    return (
      <g>
        <path className="line" d={lineWithData} />
      </g>
    );
  }
}

Line.propTypes = 

export default Line;
