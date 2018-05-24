import React from 'react';
import styled from 'styled-components';

const Text = styled.text`
  font-size: 12px;
  text-transform: uppercase;
`;

const AxisLabel = (props) => (
  <Text {...props}>{props.text}</Text>
);

export default AxisLabel;
