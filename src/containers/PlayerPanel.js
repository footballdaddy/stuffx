import React from 'react';
import { connect } from 'react-redux';
import EffectList from './EffectList';

class PlayerPanel extends React.Component {


  render() {
    const {
      attributes,
      level,
      maxHP,
      currentHP,
      stage,
    } = this.props;
    let nextExpLevel;
    if (level == 5) {
      nextExpLevel = Math.pow(10, stage + 2);
    } else {
      nextExpLevel = Math.pow(10, stage + 1) * (level + 1);
    }

    return (
      <div className="opponent-battle-screen player">
        <div>
          <p className="text-center">
          <span className="opponent-name">Player</span>
          <div className="panel-bar health-bar">
            <div
              style={{
                width: `${Math.floor(100 - (currentHP / maxHP) * 100)}%`,
              }}
              className="damage"
            />

          </div>
          <p>HP: {`${currentHP} / ${maxHP}`}</p>
          </p>

          <EffectList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  level: state.playerstats.level,
  stage: state.playerstats.stage,
  exp: state.playerstats.exp,
  maxHP: state.hp.maxHP,
  currentHP: state.hp.currentHP,
});

export default connect(
  mapStateToProps, {}
)(PlayerPanel);
