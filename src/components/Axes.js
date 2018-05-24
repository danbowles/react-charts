import React from 'react';
import PropTypes from 'prop-types';
import Axis from './Axis';

const Axes = ({ scales, margins, svgDimensions, xLabel, yLabel }) => {
  const { height, width } = svgDimensions;

  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    translate: `translate(0, ${height - margins.bottom})`,
    tickSize: height - margins.top - margins.bottom,
    label: {
      text: xLabel,
      x: width / 2,
      y: height,
    },
  };

  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: width - margins.left - margins.right,
    label: {
      text: yLabel,
      transform: 'rotate(-90)',
      y: 0,
      x: 0 - (height / 2),
      dy: '1em',
    },
  }

  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  )
};

Axes.propTypes = {
  scales: PropTypes.object.isRequired,
  margins: PropTypes.object.isRequired,
  svgDimensions: PropTypes.object.isRequired,
};

export default Axes;
