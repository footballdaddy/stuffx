import React, { Component } from 'react'
import PlayerStatsPanel from '../containers/PlayerStatsPanel'
import OpponentPanel from '../containers/OpponentPanel'
export default class StatsPanel extends Component {
  render() {
    return (
      <div className="flex-container">
        <div>
          <PlayerStatsPanel />
        </div>
        <div>
          <OpponentPanel />
        </div>
      </div>
    )
  }
}
