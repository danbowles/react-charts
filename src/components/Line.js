import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { line as d3Line, curveBasis } from 'd3-shape';
import './Line.css';

class Line extends Component {
  render() {
    const lineGenerator = d3Line();

    const {
      scales: { xScale, yScale },
      data,
    } = this.props;

    lineGenerator
      .x(function lineX(d, i) {
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

Line.propTypes = {
  scales: PropTypes.shape(PropTypes.object).isRequired,
  data: PropTypes.shape(PropTypes.arrayOf(PropTypes.object)).isRequired,
};

export default Line;
