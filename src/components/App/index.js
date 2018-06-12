import React, { Component } from 'react';
import InventoryPanel from '../../containers/InventoryPanel';
import StatsPanel from '../../containers/StatsPanel';
import Arena from '../../containers/Arena';
import Shop from '../../containers/Shop';
import TraitsContainer from '../../containers/TraitsContainer';
import AttackButtons from '../../containers/AttackButtons';

import MagicShop from '../../containers/MagicShop';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.timerId = null;
  }

  render() {
    return (
      <div>
        <div>
          <AttackButtons />
        </div>
        <div className="game-box">
          <StatsPanel />
          <Arena />

        </div>
        {/* <InventoryPanel /> */}

        <div>
          <TraitsContainer />
        </div>
        <div>
          <Shop />
        </div>
        <div>
          <MagicShop />
        </div>
      </div>
    );
  }
}
