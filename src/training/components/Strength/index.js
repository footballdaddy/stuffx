import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Strength extends Component {
  static propTypes = {
    stats: PropTypes.object,
    incrementStat: PropTypes.func,
    decrementStat: PropTypes.func,
  };
  render() {
    const {magic, elementActive} = this.props.stats
    const {stats} = this.props
    return (
      <div>
        {Object.keys(magic).map((training, i) => (
          <div key={i}>
            <label id="value">
              {elementActive} {training}  Current Cap:{' '}
              {magic[training].cap[elementActive]} Reduce Gain:{' '}
              {magic[training].rateGrowth[elementActive] *
                (magic[training].exp[elementActive] /
                  magic[training].cap[elementActive]) <=
              250
                ? magic[training].rateGrowth[elementActive] *
                  (magic[training].exp[elementActive] /
                    magic[training].cap[elementActive])
                : magic[training].cap[elementActive]}
              <br />
              Current Level:
              {magic[training].exp[elementActive] /
                magic[training].cap[elementActive]}{' '}
              Rate Value: {magic[training].rate[elementActive]}
            </label>
            <button
              onClick={() =>
                this.props.incrementStat(training, elementActive , 1)
              }
            >
              +
            </button>
            <button
              onClick={() =>
                this.props.decrementStat(training, elementActive , 1)
              }
            >
              -
            </button>
            <button
              onClick={() =>
                this.props.decrementStat(
                  training,
                  elementActive,
                  magic[training].rate[elementActive],
                )
              }
            >
              Reset
            </button>
            <button
              onClick={() =>
                this.props.incrementStat(
                  training,
                  elementActive,
                  stats.energy.value,
                )
              }
            >
              Cap
            </button>
          </div>
        ))}
      </div>
    );
  }
}
