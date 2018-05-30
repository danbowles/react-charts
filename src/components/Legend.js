import React from 'react';
import PropTypes from 'prop-types';
import { scaleOrdinal } from 'd3-scale';
import styled from 'styled-components';

const Text = styled.text`
  font-family: 'arial', sans-serif;
  font-size: 10px;
  text-anchor: end;
`;

const Legend = ({ colors, keys, width }) => {
  const colorScale = scaleOrdinal().range(colors);
  const rWidth = 19;
  const rHeight = 19;

  const legendItems = keys.slice().map((key, index) => {
    return (
      <g transform={`translate(0, ${index * 20})`}>
        <rect
          x={width - rWidth}
          height={rHeight}
          width={rWidth}
          fill={colorScale(index)}
        />
        <Text
          x={width - rWidth - 5}
          y={9.5}
          dy="0.32em"
        >
          {key}
        </Text>
      </g>
    )
  });

  return (
    <g className="legend">
      {legendItems}
    </g>
  );
};

Legend.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Legend;
