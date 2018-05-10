import React from 'react';
import { connect } from 'react-redux';
import {
  incrementAttribute,
  calculateAttributeBonus,
} from '../redux/modules/actions';
import EffectList from './EffectList';

class StatsPanel extends React.Component {
  handleClick = attr => {
    this.props.incrementAttribute(attr);
    this.props.calculateAttributeBonus();
  };

  render() {
    const {
      attributes,
      armor,
      blockChance,
      damage,
      hitChance,
      lifeDrain,
      criticalChance,
      attributePoints,
      incrementAttribute,
      calculateAttributeBonus,
      exp,
      level,
      nextLevel,
      maxHP,
      currentHP,
      temporaryEffects,
      stage,
      playerstats,
    } = this.props;
    let nextExpLevel;
    if (level == 5) {
      nextExpLevel = Math.pow(10, stage + 2);
    } else {
      nextExpLevel = Math.pow(10, stage + 1) * (level + 1);
    }

    return (
      <div className="flex-row">
        <div className="hero-attributes">
          <div className="attr-pts">
            <p>Stats</p>
          </div>

          <div className="flex-row">
            <div className="panel-damage attr-pic" />
            <p>
              Damage:<br />{' '}
              {`${Math.round(damage[0])} - ${Math.round(damage[1])}`}
            </p>
          </div>
          <div className="flex-row">
            <div className="panel-hit-chance attr-pic" />
            <p>
            Hit Chance Bonus / Percent:<br />
              {playerstats.baseHitChance +
                playerstats.traitBonus.hitChance +
                playerstats.boostedStats.hitChance}{' '}
              / {(hitChance * 100).toFixed(2)}%
            </p>
          </div>

          <div className="flex-row">
            <div className="panel-armor attr-pic" />
            <p>
              Damge Reduction Armor Bonus / Percent:<br />{' '}
              {playerstats.baseArmor +
                playerstats.traitBonus.armor +
                playerstats.boostedStats.armor}{' '}
              / {(armor).toFixed(2)}%
            </p>
          </div>
          <div className="flex-row">
            <div className="panel-block-chance attr-pic" />
            <p>
            Block Chance Bonus / Percent:<br />
              {playerstats.baseBlockChance +
                playerstats.traitBonus.blockChance +
                playerstats.boostedStats.blockChance}{' '}
              / {(blockChance * 100).toFixed(2)}%
            </p>
          </div>
          <div className="flex-row">
            <div className="panel-life-drain attr-pic" />
            <p>
              Life Drain Bonus / Percent:<br />
              {playerstats.baselifeDrain +
                playerstats.traitBonus.lifeDrain +
                playerstats.boostedStats.lifeDrain}{' '}
              / {(lifeDrain * 100).toFixed(2)}%
            </p>
          </div>
          <div className="flex-row">
            <div className="panel-life-drain attr-pic" />
            <p>
              Critical Chance Bonus / Percent:<br />
              {playerstats.baseCriticalChance +
                playerstats.traitBonus.criticalChance +
                playerstats.boostedStats.criticalChance}{' '}
              / {(criticalChance * 100).toFixed(2)}%
            </p>
          </div>
        </div>
        <div className="hero-right-panel">
          <p className="player-name">Player</p>
          <p>Stage: {stage}</p>
          <p>Level: {level}</p>
          <div className="panel-bar exp-bar">
            <p>EXP: {`${exp} / ${nextExpLevel}`}</p>

            <div
              style={{ width: `${Math.floor(exp / nextExpLevel * 100)}%` }}
              className="exp"
            />
          </div>

          <div className="hero-pic" />
          <div className="panel-bar health-bar">
            <p>HP: {`${currentHP} / ${maxHP}`}</p>
            <div
              style={{ width: `${Math.floor(100 - currentHP / maxHP * 100)}%` }}
              className="damage"
            />
          </div>

          <EffectList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  attributes: state.playerstats.attributes,
  damage: state.playerstats.damage,
  armor: state.playerstats.armor,
  hitChance: state.playerstats.hitChance,
  blockChance: state.playerstats.blockChance,
  criticalChance: state.playerstats.criticalChance,
  lifeDrain: state.playerstats.lifeDrain,
  equipped: state.equip.equipped,
  level: state.playerstats.level,
  stage: state.playerstats.stage,
  exp: state.playerstats.exp,
  maxHP: state.hp.maxHP,
  currentHP: state.hp.currentHP,
  playerstats: state.playerstats,
  temporaryEffects: state.tempeffects.temporaryEffects,
});

export default connect(mapStateToProps, {
  incrementAttribute,
  calculateAttributeBonus,
})(StatsPanel);
