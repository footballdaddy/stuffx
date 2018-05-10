const initialState = {
  progress: 1,
  progressLv: 1,
  maxProgressLv: 1,
  opponent: 'none',
};

export const decrementAttackTimeOpponent = () => ({
  type: 'DECREMENT_ATTACK_TIME_OPPONENT',
});
export const updateAttackTimeOpponent = item => ({
  type: 'UPDATE_ATTACK_TIME_OPPONENT',
  item,
});

const rewards = level => scaleValue(level, 50);

const scaleValue = (level, base) => Math.round(Math.pow(1.07, level) * base);

export const dungeonLevelManager = change => ({
  type: 'CHANGE_DUNGEON_LEVEL',
  change,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHOOSE_OPPONENT':
      // console.log(action.opponent.damage);
      let opponentDamage = action.opponent.damage.map(dmg =>
        Math.round(Math.pow(1.2, state.progressLv) * dmg),
      );
      // console.log(opponentDamage);
      return {
        ...state,
        opponent: {
          name: action.opponent.name,
          maxHP: Math.round(
            Math.pow(1.2, state.progressLv) * action.opponent.maxHP,
          ),
          currentHP: Math.round(
            Math.pow(1.2, state.progressLv) * action.opponent.maxHP,
          ),
          level: state.progressLv,
          dodgeChance: action.opponent.dodgeChance,
          hitChance: action.opponent.hitChance,
          damage: opponentDamage,
          lifeDrain: 0,
          armor: action.opponent.armor,
          criticalChance: action.opponent.criticalChance,
          reward: {
            gold: Math.round(Math.pow(1.15, state.progressLv) * 50),
            XP: Math.round(Math.pow(1.07, state.progressLv) * 50),
          },
          attackSpeed: action.opponent.attackSpeed,
          attackWait: action.opponent.attackSpeed,
          effects: [],
        },
      };
    case 'DECREMENT_ATTACK_TIME_OPPONENT':
      if (state.opponent.attackWait > 0) {
        return {
          ...state,
          opponent: {
            ...state.opponent,
            attackWait: state.opponent.attackWait - 1,
          },
        };
      } else {
        return state;
      }
    case 'UPDATE_ATTACK_TIME_OPPONENT':
      if (state.opponent.attackWait === 0) {
        return {
          ...state,
          opponent: {
            ...state.opponent,
            attackWait: state.opponent.attackSpeed,
          },
        };
      } else {
        return state;
      }
    case 'CHANGE_DUNGEON_LEVEL':
      if (action.change == 'back' && state.progressLv > 1)
        return {
          ...state,
          progressLv: state.progressLv - 1,
        };
      else if (
        action.change == 'forward' &&
        state.maxProgressLv > state.progressLv
      )
        return {
          ...state,
          progressLv: state.progressLv + 1,
        };
      else return state;

    case 'DEAL_DAMAGE':
      return {
        ...state,
        opponent: {
          ...state.opponent,
          currentHP: state.opponent.currentHP - action.damage,
        },
      };

    case 'ADD_OPPONENT_EFFECT':
      return {
        ...state,
        opponent: {
          ...state.opponent,
          effects: [...state.opponent.effects, action.effect],
        },
      };

    case 'ADD_PLUS_EFFECT':
      const increasedStat = action.item.effect.statIncrease;
      if (Object.keys(state.attributes).includes(increasedStat)) {
        return {
          ...state,
          attributes: {
            ...state.attributes,
            [increasedStat]: state.attributes[increasedStat] + 10,
          },
          boostedAttributes: [...state.boostedAttributes, increasedStat],
        };
      }

    case 'EFFECT_COOLDOWN':
      const effectIndex = state.opponent.effects
        .map(effect => effect.name)
        .indexOf(action.effect.name);

      return action.effect.duration > 1
        ? Object.assign({}, state, {
            opponent: Object.assign(
              { ...state.opponent },
              {
                effects: Object.assign([...state.opponent.effects], {
                  [effectIndex]: {
                    ...state.opponent.effects[effectIndex],
                    duration: action.effect.duration - 1,
                  },
                }),
              },
            ),
          })
        : {
            ...state,
            opponent: {
              ...state.opponent,
              effects: [
                ...state.opponent.effects.slice(0, effectIndex),
                ...state.opponent.effects.slice(effectIndex + 1),
              ],
            },
          };

    case 'DRAIN_LIFE':
      return action.payload.character === 'opponent'
        ? {
            ...state,
            opponent: {
              ...state.opponent,
              currentHP:
                state.opponent.currentHP + action.payload.value <=
                state.opponent.maxHP
                  ? state.opponent.currentHP + action.payload.value
                  : state.opponent.maxHP,
            },
          }
        : state;
    case 'PROGRESS_NEXT_ENEMY':
      return { ...state, progress: state.progress + 1 };

    case 'ADD_TRAINING_LEVEL':
      return {
        ...state,
        maxProgressLv: state.maxProgressLv + 1,
        progressLv: state.progressLv + 1,
      };

    case 'END_BATTLE_VICTORY':
      return state;
    case 'END_BATTLE_DEFEAT':
      return {
        ...state,
        opponent: 'none',
      };

    default:
      return state;
  }
};
