import React, { Component } from 'react';

export default class CounterAttack extends Component {
  render() {
    return (
      <div>
        <span>Player Wait Time:{this.props.playerTurn}</span>
        <br />
        <span>Opponent Wait Time:{this.props.opponentTurn}</span>
      </div>
    );
  }
}
