import React, { Component } from 'react';

class Fight extends Component {

  render() {
    // stats, game as props for battle ... Why?
    const { enemy } = this.props;
    return (
      <div>
        <button onClick={() => this.props.startBattle()}>FIGHT</button>
        <button onClick={() => this.props.stopBattle()}>STOP FIGHT</button>
        <div>
          <h1>Health: {enemy.health}</h1>
        </div>
        <div>
          <h1>Attack: {enemy.stats.strength}</h1>
        </div>
        <div>
          <h1>Defense: {enemy.stats.defense}</h1>
        </div>
      </div>
    );
  }
}

export default Fight;
