import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// Copmponents
import { opponentList } from '../data/opponentList';
import { randomArrayItem } from '../common';
// Actions
import {
  chooseOpponent,
} from '../redux/modules/actions';
import { dungeonLevelManager } from '../redux/modules/opponent';

class DungeonManager extends React.Component {

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

  componentDidMount() {
    this.handleClick();
  }

  render() {
    const { opponent, stage, level, exp } = this.props;
    let nextExpLevel;
    if (level == 5) {
      nextExpLevel = Math.pow(10, stage + 2);
    } else {
      nextExpLevel = Math.pow(10, stage + 1) * (level + 1);
    }
    return (
      <div className="flex-container-wrap text-center">
        <Fragment>
        <div className="flex-container-wrap header-exp">
        <div className="header-stage">Stage: {stage}</div>
          <div className="header-level">Level: {level}</div>

            <div className="header-exp-title">

            <p>Physical Energy: {`${exp} / ${nextExpLevel}`}</p>
            </div>
        <div className="panel-bar exp-bar header-exp-title">

            <div
              style={{ width: `${Math.floor(exp / nextExpLevel * 100)}%` }}
              className="exp"
              />
            </div>
              </div>

          <span className="header-dungeon">
          Current Dungeon Level: {opponent.progressLv}
            </span>
            <span className="header-dungeon">
          Max Dungeon Level: {opponent.maxProgressLv}
          </span>

          <button onClick={this.handleDungeonBackClick}>Back</button>
          Current Progress:{' '}
          {opponent.progress % 10 === 0 ? 10 : opponent.progress % 10}/10
          <button onClick={this.handleDungeonForwardClick}>Forward</button>

          {/* future Pause */}
          {/* {this.props.opponent.opponent === 'none' ? (
            <button className="use-btn" onClick={this.handleClick}>
              Start Dungeon Exploring
            </button>
          ) : (
            <button className="use-btn">In Battle ...</button>
          )} */}
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  opponent: state.opponent,
  level: state.playerstats.level,
  stage: state.playerstats.stage,
  exp: state.playerstats.exp,
});

export default connect(mapStateToProps, {
  chooseOpponent,
  dungeonLevelManager,
})(DungeonManager);
