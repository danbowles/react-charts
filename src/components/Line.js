import React from 'react';
import PropTypes from 'prop-types';
import { line as d3Line, curveBasis } from 'd3-shape';
import './Line.css';

const Line = ({
  scales: { xScale, yScale },
  data,
}) => {
  const lineGenerator = d3Line();

  lineGenerator
    .x((d, i) => xScale(i))
    .y((d) => yScale(d.value))
    .curve(curveBasis);

  const lineWithData = lineGenerator(data);

  return (
    <g>
      <path className="line" d={lineWithData} />
    </g>
  );
};

Line.propTypes = {
  scales: PropTypes.shape({
    xScale: PropTypes.func,
    yScale: PropTypes.func,
  }).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Line;
