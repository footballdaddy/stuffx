import React, { Component } from 'react';
import Arena from '../../containers/Arena';
import Skills from '../../containers/Skills';
import DungeonContainer from '../../containers/DungeonContainer'
import TabImportant from '../../containers/TabImportant';
import OpponentScreen from '../../containers/OpponentScreen';
import TabMisc from '../../containers/TabMisc'
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
          <Arena />
          <TabImportant />
          <OpponentScreen />
          <Skills />
          <TabMisc />

      </div>
    );
  }
}
