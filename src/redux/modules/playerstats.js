//base statisicts - without bonus from attributes
export const incrementTrait = trait => ({
  type: 'INCREMENT_TRAIT',
  trait,
});
export const calculateTraitBonus = trait => ({
  type: 'TRAIT_BONUS_CALCULATE',
  trait,
});

export const levelUpTrait = trait => {
  // for (let key in traits) {
  //   if (skills[key].level == 5) {
  // }
  // state.traits[action.trait].damage * state.traits[action.trait].level
  return dispatch => {
    dispatch({ type: 'INCREMENT_TRAIT', trait });
    dispatch({ type: 'TRAIT_BONUS_CALCULATE', trait });
  };
};

export const decrementAttackTime = () => ({
  type: 'DECREMENT_ATTACK_TIME',
});
export const updateAttackTime = item => ({
  type: 'UPDATE_ATTACK_TIME',
  item,
});
const initialState = {
  traitBonus: {
    blockChance: 0,
    damage: 0,
    hitChance: 0,
    armor: 0,
    lifeDrain: 0,
    criticalChance: 0,
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
    power: {
      name: 'power',
      type: 'power',
      nextTrait: 'power2',
      maxLevel: 5,
      level: 0,
      skill: 'none',
      canLevel: true,
      damage: 5,
      blockChance: 0,
      hitChance: 0,
      armor: 0,
      lifeDrain: 0,
      criticalChance: 0,
    },
    focus: {
      name: 'focus',
      type: 'focus',
      nextTrait: 'focus2',
      canLevel: true,
      maxLevel: 5,
      level: 0,
      skill: 'none',
      damage: 0,
      blockChance: 20,
      hitChance: 20,
      armor: 0,
      lifeDrain: 0,
      criticalChance: 0,
    },
    technique: {
      name: 'technique',
      type: 'technique',
      nextTrait: 'technique2',
      canLevel: true,
      maxLevel: 5,
      level: 0,
      skill: 'none',
      damage: 0,
      blockChance: 0,
      hitChance: 0,
      armor: 0,
      lifeDrain: 20,
      criticalChance: 20,
    },
    power2: {
      name: 'Power2',
      type: 'power',
      level: 0,
      maxLevel: 5,
      nextTrait: 'none',
      skill: 'fury',
      damage: 10,
      canLevel: false,
      blockChance: 0,
      hitChance: 0,
      armor: 0,
      lifeDrain: 0,
      criticalChance: 0,
    },
    focus2: {
      name: 'Focus2',
      type: 'focus',
      level: 0,
      maxLevel: 5,
      nextTrait: 'none',
      skill: 'vigilance',
      damage: 10,
      canLevel: false,
      blockChance: 40,
      hitChance: 0,
      armor: 40,
      lifeDrain: 0,
      criticalChance: 0,
    },
    technique2: {
      name: 'technique2',
      type: 'technique',
      level: 0,
      maxLevel: 5,
      nextTrait: 'none',
      skill: 'criticalDrain',
      damage: 10,
      blockChance: 0,
      hitChance: 0,
      armor: 0,
      lifeDrain: 40,
      criticalChance: 40,
    },
  },
  attributePoints: 20,
  traitPoints: 200,
  armor: 0,
  baseArmor: 0,
  baseBlockChance: 0,
  baseDamage: [2, 4],
  baseHitChance: 0,
  blockChance: 0,
  damage: [2, 4],
  hitChance: 0,
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
            baseArmor:
              state.baseArmor +
              action.item.armor +
              action.item.armor * 0.2 * action.item.upgradeTimes,
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
          let accessoryDamage = state.baseDamage.map(
            dmg =>
              dmg +
              action.item.statsIncrease.damage +
              action.item.statsIncrease.damage * 0.2 * action.item.upgradeTimes,
          );
          return {
            ...state,
            baseDamage: accessoryDamage,
            baseHitChance:
              state.baseHitChance +
              action.item.statsIncrease.hitChance +
              action.item.statsIncrease.hitChance *
                0.2 *
                action.item.upgradeTimes,
            baseBlockChance:
              state.baseBlockChance +
              action.item.statsIncrease.blockChance +
              action.item.statsIncrease.blockChance *
                0.2 *
                action.item.upgradeTimes,
            baseArmor:
              state.baseArmor +
              action.item.statsIncrease.armor +
              action.item.statsIncrease.armor * 0.2 * action.item.upgradeTimes,
            baselifeDrain:
              state.baselifeDrain +
              action.item.statsIncrease.lifeDrain +
              action.item.statsIncrease.lifeDrain *
                0.2 *
                action.item.upgradeTimes,
            baseCriticalChance:
              state.baseCriticalChance +
              action.item.statsIncrease.criticalChance +
              action.item.statsIncrease.criticalChance *
                0.2 *
                action.item.upgradeTimes,
          };
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
            baseArmor:
              state.baseArmor -
              (action.item.armor +
                action.item.armor * 0.2 * action.item.upgradeTimes),
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
          let accessoryDamageUn = state.baseDamage.map(
            dmg =>
              dmg -
              action.item.statsIncrease.damage -
              action.item.statsIncrease.damage * 0.2 * action.item.upgradeTimes,
          );

          return {
            ...state,
            baseDamage: accessoryDamageUn,
            baseHitChance:
              state.baseHitChance -
              (action.item.statsIncrease.hitChance +
                action.item.statsIncrease.hitChance *
                  0.2 *
                  action.item.upgradeTimes),
            baseBlockChance:
              state.baseBlockChance -
              (action.item.statsIncrease.blockChance +
                action.item.statsIncrease.blockChance *
                  0.2 *
                  action.item.upgradeTimes),
            baseArmor:
              state.baseArmor -
              (action.item.statsIncrease.armor +
                action.item.statsIncrease.armor *
                  0.2 *
                  action.item.upgradeTimes),
            baselifeDrain:
              state.baselifeDrain -
              (action.item.statsIncrease.lifeDrain +
                action.item.statsIncrease.lifeDrain *
                  0.2 *
                  action.item.upgradeTimes),
            baseCriticalChance:
              state.baseCriticalChance -
              (action.item.statsIncrease.criticalChance +
                action.item.statsIncrease.criticalChance *
                  0.2 *
                  action.item.upgradeTimes),
          };
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
          dmg + state.traitBonus.damage + dmg * 0.2 * state.boostedStats.damage,
      );
      return {
        ...state,
        blockChance:
          40 /
          (1 +
            35 *
              Math.exp(
                -0.009 *
                  (state.baseBlockChance +
                    state.traitBonus.blockChance +
                    state.boostedStats.blockChance),
              )) *
          0.01,
        hitChance:
          80 /
          (1 +
            75 *
              Math.exp(
                -0.009 *
                  (state.baseHitChance +
                    state.traitBonus.hitChance +
                    state.boostedStats.hitChance),
              )) *
          0.01,
        damage: ele,
        lifeDrain:
          40 /
          (1 +
            35 *
              Math.exp(
                -0.009 *
                  (state.baselifeDrain +
                    state.traitBonus.lifeDrain +
                    state.boostedStats.lifeDrain),
              )) *
          0.01,
        armor:
          40 /
          (1 +
            35 *
              Math.exp(
                -0.009 *
                  (state.baseArmor +
                    state.traitBonus.armor +
                    state.boostedStats.armor),
              )),
        criticalChance:
          40 /
          (1 +
            35 *
              Math.exp(
                -0.009 *
                  (state.baseCriticalChance +
                    state.traitBonus.criticalChance +
                    state.boostedStats.criticalChance),
              )) *
          0.01,
      };
    case 'NEW_LEVEL_POINTS':
      return {
        ...state,
        attributePoints: state.attributePoints + 20,
      };

    case 'INCREMENT_TRAIT':
      let isMaxed =
        state.traits[action.trait].level + 1 <
        state.traits[action.trait].maxLevel
          ? 'no'
          : state.traits[action.trait].nextTrait;
      if (
        isMaxed == 'no' ||
        (isMaxed == 'none' &&
          state.traits[action.trait].level + 1 <=
            state.traits[action.trait].maxLevel)
      ) {
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
      } else if (state.traits.hasOwnProperty(isMaxed)) {
        return {
          ...state,
          traits: {
            ...state.traits,
            [action.trait]: {
              ...state.traits[action.trait],
              level: state.traits[action.trait].level + 1,
              canLevel: false,
            },
            [isMaxed]: {
              ...state.traits[isMaxed],
              canLevel: true,
            },
          },
          traitPoints: state.traitPoints - 1,
        };
      } else {
        return state;
      }
    case 'TRAIT_BONUS_CALCULATE':
      return {
        ...state,
        traitBonus: {
          ...state.traitBonus,
          blockChance:
            state.traitBonus.blockChance +
            state.traits[action.trait].blockChance,
          damage: state.traitBonus.damage + state.traits[action.trait].damage,
          hitChance:
            state.traitBonus.hitChance + state.traits[action.trait].hitChance,
          armor: state.traitBonus.armor + state.traits[action.trait].armor,
          lifeDrain:
            state.traitBonus.lifeDrain + state.traits[action.trait].lifeDrain,
          criticalChance:
            state.traitBonus.criticalChance +
            state.traits[action.trait].criticalChance,
        },
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

    case 'ADD_EFFECT':
      return {
        ...state,
        boostedStats: {
          ...state.boostedStats,
          blockChance:
            state.boostedStats.blockChance + action.item.effect.blockChance,
          damage: state.boostedStats.damage + action.item.effect.damage,
          hitChance:
            state.boostedStats.hitChance + action.item.effect.hitChance,
          armor: state.boostedStats.armor + action.item.effect.armor,
          lifeDrain:
            state.boostedStats.lifeDrain + action.item.effect.lifeDrain,
          criticalChance:
            state.boostedStats.criticalChance +
            action.item.effect.criticalChance,
        },
      };

    case 'REMOVE_SKILL_EFFECTS':
      if (action.key.effect) {
        return {
          ...state,
          boostedStats: {
            ...state.boostedStats,
            blockChance:
              state.boostedStats.blockChance - action.key.effect.blockChance,
            damage: state.boostedStats.damage - action.key.effect.damage,
            hitChance:
              state.boostedStats.hitChance - action.key.effect.hitChance,
            armor: state.boostedStats.armor - action.key.effect.armor,
            lifeDrain:
              state.boostedStats.lifeDrain - action.key.effect.lifeDrain,
            criticalChance:
              state.boostedStats.criticalChance -
              action.key.effect.criticalChance,
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
