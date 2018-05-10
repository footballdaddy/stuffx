//base statisicts - without bonus from attributes
export const incrementTrait = trait => ({
  type: 'INCREMENT_TRAIT',
  trait,
});

export const decrementAttackTime = () => ({
  type: 'DECREMENT_ATTACK_TIME',
});
export const updateAttackTime = item => ({
  type: 'UPDATE_ATTACK_TIME',
  item,
});
const initialState = {
  attributes: {
    strength: 10,
    defense: 10,
    agility: 10,
    vitality: 10,
  },
  exp: 100,
  stage: 1,
  level: 1,
  boostedStats: {
    blockChance: 0,
    damage: 0,
    hitChance: 0,
    armor: 0,
    lifeDrain: 0,
    criticalChance: 0,
  },
  traits: {
    damage: {
      name: 'damage',
      level: 1,
      multiplier: 1,
    },
    hitChance: {
      name: 'hitChance',
      level: 1,
      multiplier: 0.01,
    },
    blockChance: {
      name: 'blockChance',
      level: 0,
      multiplier: 0.01,
    },
    armor: {
      name: 'armor',
      level: 0,
      multiplier: 0.1,
    },
    lifeDrain: {
      name: 'lifeDrain',
      level: 0,
      multiplier: 0.01,
    },
    criticalChance: {
      name: 'criticalChance',
      level: 0,
      multiplier: 0.01,
    },
  },
  attributePoints: 20,
  traitPoints: 10,
  armor: 0,
  baseArmor: 0,
  baseBlockChance: 0.05,
  baseDamage: [2, 4],
  baseHitChance: 0.5,
  blockChance: 0,
  damage: [2, 4],
  hitChance: 0.55,
  lifeDrain: 0,
  baselifeDrain: 0,
  attackWait: 0,
  baseAttackSpeed: 1,
  attackSpeed: 1,
  baseCriticalChance: 0,
  criticalChance: 0,
};

// Upgrade
// Dagger
// cost: action.item.buyValue ^ action.item.upgradeTimes

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DECREMENT_ATTACK_TIME':
      if (state.attackWait > 0) {
        return {
          ...state,
          attackWait: state.attackWait - 1,
        };
      } else {
        return state;
      }
    case 'UPDATE_ATTACK_TIME':
      if (state.attackWait === 0) {
        return {
          ...state,
          attackWait: state.attackSpeed,
        };
      } else {
        return state;
      }
    case 'UPDATE_EQUIPPED':
    case 'EQUIP_ITEM':
      switch (action.item.category) {
        case 'helmets':
        case 'armors':
        case 'boots':
        case 'gloves':
          return {
            ...state,
            baseArmor: state.baseArmor + action.item.armor,
            baseHitChance: state.baseHitChance - action.item.hitChancePenalty,
          };

        case 'weapons':
          let weapon = action.item.dmgRange.map(
            (dmg, i) =>
              dmg + state.baseDamage[i] + dmg * 0.2 * action.item.upgradeTimes,
          );
          return {
            ...state,
            baseDamage: weapon,
            baseHitChance: state.baseHitChance + action.item.hitChance,
            attackSpeed: action.item.attackSpeed,
            baseCriticalChance:
              state.baseCriticalChance + action.item.criticalChance,
          };
        // Use shields damage same slot but edit damage stats
        // Edit damage weapon state by doing what base armor does: BaseDamge + weapon use that for unequip
        case 'shields':
          if (action.item.subCategory === 'weapon') {
            let weaponShield = action.item.dmgRange.map(
              (dmg, i) =>
                dmg +
                state.baseDamage[i] +
                dmg * 0.2 * action.item.upgradeTimes,
            );

            return {
              ...state,
              baseDamage: weaponShield,
              baseBlockChance:
                state.baseBlockChance + action.item.blockChanceBonus,
              baseHitChance: state.baseHitChance + action.item.hitChance,
              attackSpeed:
                action.item.attackSpeed < state.attackSpeed
                  ? state.attackSpeed
                  : action.item.attackSpeed,
              baseCriticalChance:
                state.baseCriticalChance + action.item.criticalChance,
            };
          } else {
            return {
              ...state,
              baseBlockChance:
                state.baseBlockChance + action.item.blockChanceBonus,
            };
          }

        case 'rings':
        case 'necklaces':
          let stat = Object.keys(action.item.statsIncrease)[0];

          if (stat === 'all') {
            return {
              ...state,
              baseHitChance:
                state.baseHitChance + action.item.statsIncrease.value * 0.2 * action.item.upgradeTimes,
                baseBlockChance: state.baseBlockChance + action.item.statsIncrease.value * 0.2 * action.item.upgradeTimes,
              baselifeDrain: state.baselifeDrain + action.item.statsIncrease.value * 0.2 * action.item.upgradeTimes,
              baseCriticalChance:
                state.baseCriticalChance + action.item.statsIncrease.value * 0.2 * action.item.upgradeTimes,
            };
          }

          if (stat === 'baseDamage') {
            let accessoryDamage = state.baseDamage.map(
              (dmg, i) =>
                dmg[i] +
                dmg[i] * 0.2 * action.item.upgradeTimes,
            );
            return {
              ...state,
              baseDamage: accessoryDamage
            };
          }

          return Object.keys(state).includes(stat)
            ? {
                ...state,
                  [stat]:
                    state[stat] + action.item.statIncrease[action.item.statIncrease.value] * 0.2 * action.item.upgradeTimes,
              } : state;
        default:
          return state;
      }

    case 'UNEQUIP_ITEM':
      switch (action.item.category) {
        case 'helmets':
        case 'armors':
        case 'boots':
        case 'gloves':
          return {
            ...state,
            armor: state.baseArmor - action.item.armor,
            baseHitChance: state.baseHitChance + action.item.hitChancePenalty,
          };
        case 'weapons':
          let weaponX = action.item.dmgRange.map(
            (dmg, i) =>
              state.baseDamage[i] - dmg - dmg * 0.2 * action.item.upgradeTimes,
          );

          return {
            ...state,
            baseDamage: weaponX,
            baseHitChance: state.baseHitChance - action.item.hitChance,
            attackSpeed: state.baseAttackSpeed,
            baseCriticalChance:
              state.baseCriticalChance - action.item.criticalChance,
          };
        case 'shields':
          if (action.item.subCategory === 'weapon') {
            let weaponShieldx = action.item.dmgRange.map(
              (dmg, i) =>
                state.baseDamage[i] -
                dmg -
                dmg * 0.2 * action.item.upgradeTimes,
            );

            return {
              ...state,
              baseDamage: weaponShieldx,
              baseBlockChance:
                state.baseBlockChance - action.item.blockChanceBonus,
              baseHitChance: state.baseHitChance - action.item.hitChance,
              attackSpeed:
                action.item.attackSpeed < state.attackSpeed
                  ? state.attackSpeed
                  : action.item.attackSpeed,
              baseCriticalChance:
                state.baseCriticalChance - action.item.criticalChance,
            };
          } else {
            return {
              ...state,
              baseBlockChance:
                state.baseBlockChance - action.item.blockChanceBonus,
            };
          }
        case 'rings':
        case 'necklaces':
        let stat = Object.keys(action.item.statsIncrease)[0];

        if (stat === 'all') {
          return {
            ...state,
            baseHitChance:
              state.baseHitChance - action.item.statsIncrease.value * 0.2 * action.item.upgradeTimes,
              baseBlockChance: state.baseBlockChance - action.item.statsIncrease.value * 0.2 * action.item.upgradeTimes,
            baselifeDrain: state.baselifeDrain - action.item.statsIncrease.value * 0.2 * action.item.upgradeTimes,
            baseCriticalChance:
              state.baseCriticalChance - action.item.statsIncrease.value * 0.2 * action.item.upgradeTimes,
          };
        }

        if (stat === 'baseDamage') {
          let accessoryDamage = state.baseDamage.map(
            (dmg, i) =>
              dmg[i] -
              dmg[i] * 0.2 * action.item.upgradeTimes,
          );
          return {
            ...state,
            baseDamage: accessoryDamage
          };
        }

        return Object.keys(state).includes(stat)
          ? {
              ...state,
                [stat]:
                  state[stat] - action.item.statIncrease[action.item.statIncrease.value] * 0.2 * action.item.upgradeTimes,
            } : state;

        default:
          return state;
      }
    // remove
    case 'INCREMENT_ATTRIBUTE':
      return {
        ...state,
        attributes: {
          ...state.attributes,
          [action.attribute]: state.attributes[action.attribute] + 1,
        },
        attributePoints: state.attributePoints - 1,
      };

    case 'CALCULATE_ATTRIBUTE_BONUS':
      let ele = state.baseDamage.map(
        dmg =>
          dmg +
          state.traits.damage.multiplier * state.traits.damage.level +
          dmg * 0.2 * state.boostedStats.damage,
      );

      return {
        ...state,
        blockChance:
          state.baseBlockChance +
          state.traits.hitChance.multiplier * state.traits.hitChance.level +
          0.02 * state.boostedStats.hitChance,
        hitChance:
          state.baseHitChance +
          state.traits.hitChance.multiplier * state.traits.hitChance.level +
          0.02 * state.boostedStats.hitChance,
        damage: ele,
        lifeDrain:
          state.baselifeDrain +
          state.traits.lifeDrain.multiplier * state.traits.lifeDrain.level +
          0.02 * state.boostedStats.lifeDrain,
        armor:
          state.baseArmor +
          state.traits.armor.multiplier * state.traits.armor.level +
          0.02 * state.boostedStats.armor,
        criticalChance:
          state.baseCriticalChance +
          state.traits.criticalChance.multiplier *
            state.traits.criticalChance.level +
          0.02 * state.boostedStats.criticalChance,
        // attackSpeed: state.attackSpeed,
      };
    case 'NEW_LEVEL_POINTS':
      return {
        ...state,
        attributePoints: state.attributePoints + 20,
      };

    case 'ADD_EFFECT':
      const increasedStat = action.item.effect.statIncrease;

      return {
        ...state,
        boostedStats: {
          ...state.boostedStats,
          [increasedStat]: action.item.effect.value,
        },
      };

    case 'INCREMENT_TRAIT':
      return {
        ...state,
        traits: {
          ...state.traits,
          [action.trait]: {
            ...state.traits[action.trait],
            level: state.traits[action.trait].level + 1,
          },
        },
        traitPoints: state.traitPoints - 1,
      };

    case 'END_BATTLE_VICTORY':
      let newStageLevel = stage_and_level_from_points(
        state.exp + action.reward.XP,
      );
      if (state.stage < newStageLevel[0])
        return {
          ...state,
          traitPoints: state.traitPoints + 3,
          stage: state.stage + 1,
          level: 1,
          exp: state.exp + action.reward.XP,
        };
      if (state.level < newStageLevel[1])
        return {
          ...state,
          traitPoints: state.traitPoints + 1,
          level: state.level + 1,
          exp: state.exp + action.reward.XP,
        };

      return {
        ...state,
        exp: state.exp + action.reward.XP,
      };
    case 'END_BATTLE_DEFEAT':
      return state;
    case 'REMOVE_SKILL_EFFECTS':
      if (action.key.effect) {
        return {
          ...state,
          [action.key.effect.statIncrease]:
            state[action.key.effect.statIncrease] -
            state.boostedStats[action.key.name],
          boostedStats: {
            ...state.boostedStats,
            [action.key.name]: 0,
          },
        };
      } else {
        return state;
      }

    case 'END_GAME':
      return state;

    default:
      return state;
  }
};

function stage_and_level_from_points(exp) {
  let stage = Math.floor(Math.log10(exp)) - 1;
  let base_stage_xp = Math.pow(10, stage + 1);
  let level = Math.min(5, Math.floor(exp / base_stage_xp));
  return [stage, level];
}
