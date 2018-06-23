import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Strength from '../Strength';
import Defense from '../Defense';
import Rebirth from '../Rebirth';
import BattleContainer from '../../containers/BattleContainer';
import { Dropdown } from 'semantic-ui-react';


export default class App extends Component {
  static propTypes = {
    stats: PropTypes.object,
    incrementStat: PropTypes.func,
    decrementStat: PropTypes.func,
  };

  handleChange = (event) => {
    this.props.changeElementUI(event.target.value)
    // console.log(event.target.value)
  }

  // rebirthStats = () => {
  //   callRebirth();
  // };

  render() {
    const { stats } = this.props;
    const { elementUnlocks } = this.props.stats;
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1>
            Energy: {Math.ceil(stats.energy.value)}/
            {Math.ceil(stats.energy.level)}
          </h1>
        </div>
        <div>
          <select value={this.props.elementActive} onChange={this.handleChange}>
          {Object.keys(elementUnlocks)
            .filter(unlocked => elementUnlocks[unlocked] === true)
            .map((element, index) => (
                <option key={index} value={element}>{element}</option>
              ))}
              </select>
        </div>

        <div>
          <Strength {...this.props} />
        </div>
        <div>{/* <Defense {...this.props} /> */}</div>
        <div>
          <h1>Attack: {stats.attack.stat}</h1>
        </div>
        <div>
          <h1>Defense: {stats.defense.stat}</h1>
        </div>
        <div>
          <h1>
            Health: {stats.health.currenthealth} / {stats.health.stat}
          </h1>
        </div>
        <div>
          <h1>Health Regen: {stats.defense.stat / 20}</h1>
        </div>
        <div>
          <BattleContainer />
        </div>
        <div>
          <Rebirth {...this.props} />
        </div>
      </div>
    );
  }
}
