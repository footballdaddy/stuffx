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
              {magic[training].cap['normal']} Reduce Gain:{' '}
              {magic[training].rateGrowth['normal'] *
                (magic[training].exp['normal'] /
                  magic[training].cap['normal']) <=
              250
                ? magic[training].rateGrowth['normal'] *
                  (magic[training].exp['normal'] /
                    magic[training].cap['normal'])
                : magic[training].cap['normal']}
              <br />
              Current Level:
              {magic[training].exp['normal'] /
                magic[training].cap['normal']}{' '}
              Rate Value: {magic[training].rate['normal']}
            </label>
            <button
              onClick={() =>
                this.props.incrementStat(training, 'normal' , 1)
              }
            >
              +
            </button>
            <button
              onClick={() =>
                this.props.decrementStat(training, 'normal' , 1)
              }
            >
              -
            </button>
            <button
              onClick={() =>
                this.props.decrementStat(
                  training,
                  'normal',
                  magic[training].rate['normal'],
                )
              }
            >
              Reset
            </button>
            <button
              onClick={() =>
                this.props.incrementStat(
                  training,
                  'normal',
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
