import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Strength extends Component {
  static propTypes = {
    stats: PropTypes.object,
    incrementStat: PropTypes.func,
    decrementStat: PropTypes.func,
  };
  render() {
    const {magic} = this.props.stats
    const {stats} = this.props
    return (
      <div>
        {Object.keys(magic).map((training, i) => (
          <div key={i}>
            <label id="value">
              Normal {training}  Current Cap:{' '}
              {magic[training].cap[0]} Reduce Gain:{' '}
              {magic[training].rateGrowth[0] *
                (magic[training].exp[0] /
                  magic[training].cap[0]) <=
              250
                ? magic[training].rateGrowth[0] *
                  (magic[training].exp[0] /
                    magic[training].cap[0])
                : magic[training].cap[0]}
              <br />
              Current Level:
              {magic[training].exp[0] /
                magic[training].cap[0]}{' '}
              Rate Value: {magic[training].rate[0]}
            </label>
            <button
              onClick={() =>
                this.props.incrementStat(training, 0 , 1)
              }
            >
              +
            </button>
            <button
              onClick={() =>
                this.props.decrementStat(training, 0 , 1)
              }
            >
              -
            </button>
            <button
              onClick={() =>
                this.props.decrementStat(
                  training,
                  0,
                  magic[training].rate[0],
                )
              }
            >
              Reset
            </button>
            <button
              onClick={() =>
                this.props.incrementStat(
                  training,
                  0,
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
