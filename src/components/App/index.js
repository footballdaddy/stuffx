import React, { Component } from 'react';
import InventoryPanel from '../../containers/InventoryPanel';
import StatsPanel from '../../containers/StatsPanel';
import Arena from '../../containers/Arena';
import Shop from '../../containers/Shop';
import TraitsContainer from '../../containers/TraitsContainer';
import Skills from '../../containers/Skills';
import DungeonContainer from '../../containers/DungeonContainer'
import MagicShop from '../../containers/MagicShop';
import TabImportant from '../../containers/TabImportant';
import OpponentScreen from '../../containers/OpponentScreen';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.timerId = null;
  }

  render() {
    return (
      <div className="flex-container-wrap">
        <div className="dungeon">

        <DungeonContainer />
        </div>
          {/* <StatsPanel /> */}
          <OpponentScreen />
          <TabImportant />
          <Arena />
          <Skills />

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
