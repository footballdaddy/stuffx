import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import StatsPanel from './StatsPanel';
// Copmponents
import HeroBattleScreen from './HeroBattleScreen';
import Console from './Console';
import OpponentScreen from './OpponentScreen';
import { opponentList } from '../data/opponentList';
import { randomArrayItem } from '../common';
import EquipmentPanel from './EquipmentPanel'
// Actions
import {
  chooseOpponent,
  calculateAttributeBonus,
  updateEquipped,
} from '../redux/modules/actions';
import { dungeonLevelManager } from '../redux/modules/opponent';

class Arena extends React.Component {
  componentDidMount = () => {
    const { equipped } = this.props;
    const battleGear = equipped.filter(
      item => item.category !== 'potions' && item.category !== 'oils',
    );
    // console.log(battleGear);
    this.props.updateEquipped(battleGear);
    this.props.calculateAttributeBonus();
    this.handleClick();
    // this.props.chooseOpponent('opponentList');
  };

  handleClick = () => {
    this.props.chooseOpponent(randomArrayItem(opponentList));
  };

  handleDungeonBackClick = () => {
    if (this.props.opponent.progressLv <= 1) {
      return;
    } else {
      this.props.dungeonLevelManager('back');
    }
  };
  handleDungeonForwardClick = () => {
    if (this.props.opponent.maxProgressLv <= this.props.opponent.progressLv) {
      return;
    } else {
      this.props.dungeonLevelManager('forward');
    }
  };

  render() {
    const { opponent, logs } = this.props;
    return (
      <div>
        <Fragment>
          Max Dungeon Level: {opponent.maxProgressLv} <br />
          Current Level: {opponent.progressLv} <br />
          <button onClick={this.handleDungeonBackClick}>Back</button>
          Current Progress:{' '}
          {opponent.progress % 10 === 0 ? 10 : opponent.progress % 10}/10
          <button onClick={this.handleDungeonForwardClick}>Forward</button>
          <br />
          {this.props.opponent.opponent === 'none' ? (
            <button className="use-btn" onClick={this.handleClick}>
              Start Dungeon Exploring
            </button>
          ) : (
            <button className="use-btn">In Battle ...</button>
          )}
          <HeroBattleScreen />
          <div className="vertical-layout">
            <EquipmentPanel />
            <OpponentScreen opponent={opponent.opponent} />

          </div>
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  opponent: state.opponent,
  equipped: state.equip.equipped,
});

export default connect(mapStateToProps, {
  chooseOpponent,
  calculateAttributeBonus,
  updateEquipped,
  dungeonLevelManager,
})(Arena);
