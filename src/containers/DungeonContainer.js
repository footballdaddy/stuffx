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
    const { opponent } = this.props;
    return (
      <div>
        <Fragment>
          Max Dungeon Level: {opponent.maxProgressLv}
          Current Level: {opponent.progressLv}
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
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  opponent: state.opponent,
});

export default connect(mapStateToProps, {
  chooseOpponent,
  dungeonLevelManager,
})(DungeonManager);
