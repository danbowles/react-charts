import React from 'react';
import styled from 'styled-components';

const Text = styled.text`
  fill: ${(props) => (props.outside ? 'black' : 'white')};
  font-weight: 400;
  font-size: 12px;
  text-anchor: middle;
`;

const BarLabel = ({ x, y, text, outside }) => (
  <Text outside={outside} x={x} y={y} dy="1em">
    {text}
  </Text>
);

export default BarLabel;
