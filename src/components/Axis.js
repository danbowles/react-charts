import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3Axis from 'd3-axis';
import { select as d3Select } from 'd3-selection';
import AxisLabel from './AxisLabel';
import './Axis.css';

class Axis extends Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const axisType = `axis${this.props.orient}`;
    const axis = d3Axis[axisType]()
      .scale(this.props.scale)
      .tickSize(-this.props.tickSize)
      .tickPadding([12])
      .ticks(4, 's');

    d3Select(this.axisElement).call(axis);
  }

  render() {
    return (
      <g>
        <g
          className={`axis axis-${this.props.orient}`}
          ref={(el) => { this.axisElement = el; }}
          transform={this.props.translate}
        />
        <AxisLabel {...this.props.label} />
      </g>
    );
  }
}

Axis.propTypes = {
  translate: PropTypes.string.isRequired,
  tickSize: PropTypes.number.isRequired,
  orient: PropTypes.string.isRequired,
  scale: PropTypes.func.isRequired,
  label: PropTypes.shape({
    text: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
}

export default Axis;
