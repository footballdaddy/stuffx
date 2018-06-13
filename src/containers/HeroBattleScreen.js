import React from 'react';
import { connect } from 'react-redux';

import {
  dealDamage,
  sufferDamage,
  drainLife,
  logMessage,
  effectCooldown,
  endBattle,
  hpRegen,
  calculateAttributeBonus,
} from '../redux/modules/actions';

import {
  decrementActiveCoolDown,
  removeSkillEffects,
  calculateActiveCoolDown,
  stopSkill,
} from '../redux/modules/skills';
import {
  decrementAttackTime,
  updateAttackTime,
} from '../redux/modules/playerstats';
import {
  decrementAttackTimeOpponent,
  updateAttackTimeOpponent,
} from '../redux/modules/opponent';
import CounterAttack from '../components/CounterAttack';
import PlayerPanel from './PlayerPanel'

class HeroBattleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.timerId = null;
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  componentDidMount() {
    this.start();
  }

  stop = () => {
    clearInterval(this.timerId);
  };
  start = () => {
    if (!this.timerId || this.props.opponent == 'none') {
      this.timerId = setInterval(() => {
        this.autorun();
      }, 1000 / 1);
    }
  };

  autorun = () => {
    // if (this.props.currentHP <= this.props.maxHP) {
    //   this.props.hpRegen(1);
    // }
    if (this.props.opponent != 'none') {
      this.attack();
    }
  };

  changeBattleType = num => {
    this.setState({ battleType: num });
  };
  getRandomInteger = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  checkHP = (health, damage, result) => {
    if (health - damage <= 0) {
      this.props.endBattle(this.props.opponent.reward, result);
      return;
    }
  };

  opponentsTurn = (opponent = this.props.opponent) => {
    const {
      currentHP,
      blockChance,
      armor,
      temporaryEffects,
      dealDamage,
      sufferDamage,
      drainLife,
      logMessage,
      effectCooldown,
      endBattle,
      criticalChance,
    } = this.props;

    if (opponent.effects.length > 0) {
      opponent.effects.map(effect => {
        logMessage([
          'player',
          `${effect.name} deals ${effect.dmgPerTurn} damage to Your opponent.`,
        ]);
        dealDamage(effect.dmgPerTurn);
        this.checkHP(opponent.currentHP, effect.dmgPerTurn, 'success');
        effectCooldown(effect);
      });
    }

    let minDamage = opponent.damage[0];
    let maxDamage = opponent.damage[1];
    const isCriticalHitOpponent = opponent.criticalChance >= Math.random();

    let hitChance =
      opponent.effects.filter(effect => effect.name === 'Ice').length > 0
        ? opponent.hitChance
        : opponent.hitChance * 0.85;

    if (isCriticalHitOpponent) {
      minDamage *= 2.0;
      maxDamage *= 2.0;
    }

    minDamage = Math.round(minDamage);
    maxDamage = Math.round(maxDamage);
    const inflictedDamage = this.getRandomInteger(minDamage, maxDamage);

    let opponentHit = Math.random();
    let message = `Opponent performs ${
      isCriticalHitOpponent ? 'a CRITICAL attack' : 'an attack'
    }`;

    if (opponentHit > hitChance) {
      message += ' and misses.';
      logMessage(['opponent', message]);
    }

    if (opponentHit < hitChance) {
      if (Math.random() < blockChance) {
        message += ', but Your hero blocks successfuly.';
        logMessage(['opponent', message]);
      } else {
        message += ` and deals ${inflictedDamage} damage!`;
        logMessage(['opponent', message]);
        sufferDamage(inflictedDamage);

        this.checkHP(currentHP, inflictedDamage, 'defeat');

        if (opponent.lifeDrain > 0) {
          let drainedValue = Math.round(opponent.lifeDrain * inflictedDamage);
          logMessage([
            'opponent',
            `Opponent drains ${drainedValue} life from You.`,
          ]);
          drainLife({
            character: 'opponent',
            value: drainedValue,
          });
        }
      }
    }
  };

  attack = () => {
    const {
      opponent,
      temporaryEffects,
      dealDamage,
      lifeDrain,
      logMessage,
      addOpponentEffect,
      drainLife,
      boostedAttributes,
      calculateAttributeBonus,
      endBattle,
      skills,
      attackWait,
      traits,
      criticalChance,
    } = this.props;
    //  to fix
    let { hitChance, damage } = this.props;
    for (let key in skills) {
      if (skills[key].activeCoolDown == 0 && skills[key].isActive === 'true') {
        this.props.stopSkill(key);
        this.props.removeSkillEffects(skills[key]);
        this.props.calculateAttributeBonus();
      }
      if (skills[key].activeCoolDown > 0) {
        this.props.decrementActiveCoolDown(key);
      }
    }
    if (attackWait > 0) {
      this.props.decrementAttackTime();
    } else {
      let minDamage = damage[0];
      let maxDamage = damage[1];
      if (temporaryEffects.includes({ dmgIncrease: ['all', 0.5] })) {
        minDamage *= 1.5;
        maxDamage *= 1.5;
      }

      if (
        temporaryEffects.includes({ dmgIncrease: ['undead', 0.25] }) &&
        opponent.type === 'undead'
      ) {
        minDamage *= 1.25;
        maxDamage *= 1.25;
      }

      let opponentDodgeChance = opponent.dodgeChance;
      let playerHit = Math.random();
      const isCriticalHit = criticalChance >= Math.random();
      if (opponent.effects.filter(effect => effect.name === 'Ice').length > 0) {
        opponentDodgeChance *= 0.7;
      }

      if (isCriticalHit) {
        minDamage *= 2.0;
        maxDamage *= 2.0;
      }

      if (typeof opponent.armor !== 'undefined') {
        minDamage *= 1 - opponent.armor / 100;
        maxDamage *= 1 - opponent.armor / 100;
      }

      minDamage = Math.round(minDamage);
      maxDamage = Math.round(maxDamage);
      const inflictedDamage = this.getRandomInteger(minDamage, maxDamage);

      let message = `Player performs ${
        isCriticalHit ? 'a CRITICAL attack' : 'an attack'
      }`;
      if (playerHit > hitChance) {
        message += ' and misses.';
        logMessage(['player', message]);
      }

      // Calculate if to inflict damage to enemy
      if (playerHit < hitChance) {
        if (Math.random() < opponentDodgeChance) {
          message += ', but the opponent successfuly dodges.';
          logMessage(['player', message]);
        } else {
          // Calculate if success hit to the enemy
          message += ` and deals ${inflictedDamage} damage!`;
          logMessage(['player', message]);
          dealDamage(inflictedDamage);

          if (lifeDrain > 0) {
            let drainedValue = Math.round(lifeDrain * inflictedDamage);
            logMessage([
              'player',
              `You drain ${drainedValue} life from Your opponent.`,
            ]);
            drainLife({
              character: 'player',
              value: drainedValue,
            });
          }

          if (opponent.currentHP - inflictedDamage <= 0) {
            endBattle(opponent.reward, 'success');
            return;
          }

          if (
            opponent.effects.filter(effect => effect.name === 'Poison')
              .length === 0 &&
            temporaryEffects.includes('poison')
          ) {
            logMessage([
              'player',
              "Opponent has been poisoned. Poisoned enemies receive 15% of Hero's base damage each turn.",
            ]);
            addOpponentEffect({
              name: 'Poison',
              dmgPerTurn: Math.round(0.15 * inflictedDamage),
              duration: 20,
            });
          }
        }
      }
      this.props.updateAttackTime();
    }
    if (opponent.attackWait > 0) {
      this.props.decrementAttackTimeOpponent();
      // console.log('wait opponent');
    } else {
      this.opponentsTurn(opponent);
      this.props.updateAttackTimeOpponent();
    }
  };

  render() {
    return (
      <PlayerPanel />
    );
  }
}

const mapStateToProps = state => ({
  opponent: state.opponent.opponent,
  currentHP: state.hp.currentHP,
  blockChance: state.playerstats.blockChance,
  criticalChance: state.playerstats.criticalChance,
  boostedAttributes: state.playerstats.boostedAttributes,
  attackWait: state.playerstats.attackWait,
  armor: state.playerstats.armor,
  temporaryEffects: state.tempeffects.temporaryEffects,
  equipped: state.equip.equipped,
  maxHP: state.hp.maxHP,
  hitChance: state.playerstats.hitChance,
  damage: state.playerstats.damage,
  lifeDrain: state.playerstats.lifeDrain,
  skills: state.skills,
});

export default connect(mapStateToProps, {
  dealDamage,
  sufferDamage,
  drainLife,
  logMessage,
  effectCooldown,
  endBattle,
  decrementActiveCoolDown,
  removeSkillEffects,
  stopSkill,
  calculateActiveCoolDown,
  hpRegen,
  calculateAttributeBonus,
  decrementAttackTime,
  updateAttackTime,
  decrementAttackTimeOpponent,
  updateAttackTimeOpponent,
})(HeroBattleScreen);
