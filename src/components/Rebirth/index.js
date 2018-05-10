import React, { Component } from 'react';

export default class Rebirth extends Component {
  calculateRebirthStats = () => {
    const { stats } = this.props;
    for (let key in stats) {
      if (
        stats[key].stattype === 'defense' ||
        stats[key].stattype === 'strength'
      ) {
        this.props.calculateRebirth(key);
      }
    }
    this.props.calculateSpiritRebirth();
  };

  render() {
    return (
      <div>
        <button onClick={this.calculateRebirthStats}>Rebirth</button>
      </div>
    );
  }
}
