// Imports ---------------------------------------------------------------------
import { statsInitialState } from '../../../data/statsInitial';
// Type Constants --------------------------------------------------------------
const INCREMENT_STAT = 'gotg/stat/INCREMENT_STAT';
const DECREMENT_STAT = 'gotg/stat/DECREMENT_STAT';
const INCREMENT_VALUE = 'gotg/stat/INCREMENT_VALUE';
const INCREMENT_ENERGY_VALUE = 'gotg/stat/INCREMENT_ENERGY_VALUE';
const CALCULATE_ATTACK = 'gotg/stat/CALCULATE_ATTACK';
const CALCULATE_DEFENSE = 'gotg/stat/CALCULATE_DEFENSE';
const CALCULATE_SPIRIT_LEVEL = 'gotg/stat/CALCULATE_SPIRIT_LEVEL';
const CALCULATE_HEALTH = 'gotg/stat/CALCULATE_HEALTH';
const CALCULATE_HEALTH_LEVEL = 'gotg/stat/CALCULATE_HEALTH_LEVEL';

const CALCULATE_REBIRTH = 'gotg/stat/CALCULATE_REBIRTH';
const CALCULATE_SPIRIT_REBIRTH = 'gotg/stat/CALCULATE_SPIRIT_REBIRTH';

// Actions ---------------------------------------------------------------------

export const incrementStat = (stat, index, rate) => ({
  type: INCREMENT_STAT,
  stat,
  index,
  rate,
});

export const decrementStat = (stat, index, rate) => ({
  type: DECREMENT_STAT,
  stat,
  index,
  rate,
});
export const incrementValue = (key, index, value) => ({
  type: INCREMENT_VALUE,
  key,
  index,
  value,
});
export const incrementEnergyValue = (key, value) => ({
  type: INCREMENT_ENERGY_VALUE,
  key,
  value,
});
export const calculateSpiritLevel = value => ({
  type: CALCULATE_SPIRIT_LEVEL,
  value,
});
export const calculateHealth = value => ({
  type: CALCULATE_HEALTH,
  value,
});

export const calculateHealthLevel = value => ({
  type: CALCULATE_HEALTH_LEVEL,
  value,
});

export const calculateAttack = value => ({
  type: CALCULATE_ATTACK,
  value,
});
export const calculateDefense = value => ({
  type: CALCULATE_DEFENSE,
  value,
});
export const calculateRebirth = key => ({
  type: CALCULATE_REBIRTH,
  key,
});
export const calculateSpiritRebirth = key => ({
  type: CALCULATE_SPIRIT_REBIRTH,
  key,
});
export const changeElementUI = element => ({
  type: 'CHANGE_ELEMENT_UI',
  element,
});



// Battle

export const enemyAttacks = (enemyattack, playerDefense) => ({
  type: 'ENEMY_ATTACKS',
  damage: enemyattack - playerDefense,
});

// Reducer ---------------------------------------------------------------------

export default function statReducer(state = statsInitialState, action) {
  switch (action.type) {
    // Battle
    case 'ENEMY_ATTACKS':
      return {
        ...state,
        health: {
          ...state.health,
          currenthealth:
            action.damage < 0
              ? state.health.currenthealth
              : state.health.currenthealth - action.damage,
        },
      };
    case 'CHANGE_ELEMENT_UI':
    return {
      ...state, elementActive: action.element
    }
    case 'ADD_REWARD': {
      if (action.reward.hasOwnProperty('element')) {
        return {
          ...state,
          elementUnlocks: {...state.elementUnlocks, [action.reward.element]: true}
        };
      } else {
        return state;
      }

    }
    case INCREMENT_VALUE:
    // console.log(action.key + ' ' + action.index+ ' ' + action.value)
      return {
        ...state,
        magic: {
          ...state.magic,
          [action.key]: {
            ...state.magic[action.key],
            exp: {...state.magic[action.key].exp, [action.index]:
              state.magic[action.key].exp[action.index] + action.value},
          },
        },
      };

    case INCREMENT_STAT:
    // console.log(action.stat + action.index)
    if (state.energy.value <= 0) {
      return state;
    } else {
      return {
          ...state,
          magic: {
            ...state.magic,
            [action.stat]: {
              ...state.magic[action.stat],
              rate: {...state.magic[action.stat].rate, [action.index]:
                (state.magic[action.stat].rate[action.index] + action.rate)}
            },
          },
          energy: {
            ...state.energy,
            value: state.energy.value - action.rate,
          },
        };
      }

    case DECREMENT_STAT:
      if (state.magic[action.stat].rate <= 0) {
        return state;
      } else {
        return {
          ...state,
          magic: {
            ...state.magic,
            [action.stat]: {
              ...state.magic[action.stat],
              rate: {...state.magic[action.stat].rate, [action.index]:
                state.magic[action.stat].rate[action.index] - action.rate}
            },
          },
          energy: {
            ...state.energy,
            value: state.energy.value + action.rate,
          },
        };
      }
    case CALCULATE_ATTACK:
      return {
        ...state,
        attack: { ...state.attack, stat: action.value },
        health: { ...state.health, stat: action.value * 10 },
      };
    case CALCULATE_DEFENSE:
      return {
        ...state,
        defense: { ...state.defense, stat: action.value },
      };
    case CALCULATE_HEALTH:
      if (state.health.currenthealth + action.value <= state.health.stat) {
        return {
          ...state,
          health: {
            ...state.health,
            currenthealth: state.health.currenthealth + action.value,
          },
        };
      } else {
        return {
          ...state,
          health: { ...state.health, currenthealth: state.health.stat },
        };
      }

    case CALCULATE_SPIRIT_LEVEL:
      if (state.energy.level + action.value <= state.energy.cap) {
        return {
          ...state,
          energy: {
            ...state.energy,
            level: state.energy.level + action.value,
            value: state.energy.value + action.value,
            exp: state.energy.value + action.value,
          },
        };
      } else {
        return {
          ...state,
          energy: {
            ...state.energy,
            exp: state.energy.exp + action.value,
          },
        };
      }
    case CALCULATE_SPIRIT_REBIRTH:
      if ((1 / 20) * state.energy.exp <= 100000) {
        return {
          ...state,
          energy: {
            ...state.energy,
            level: 10,
            value: 10,
            cap: state.energy.cap + (1 / 20) * state.energy.exp,
          },
          health: {
            stat: 100,
            currenthealth: 10,
          },
        };
      } else {
        return {
          ...state,
          energy: {
            ...state.energy,
            level: 10,
            value: 10,
            cap: state.energy.cap + 100000,
          },
          health: {
            stat: 100,
            currenthealth: 10,
          },
        };
      }

    case CALCULATE_REBIRTH:
      let capLvlRate = state[action.key].exp / state[action.key].cap;
      if (
        state[action.key].rateGrowth * capLvlRate <=
        state[action.key].cap * 0.1
      ) {
        return {
          ...state,
          [action.key]: {
            ...state[action.key],
            cap:
              state[action.key].cap - state[action.key].rateGrowth * capLvlRate,
            exp: 0,
            rate: 0,
          },
        };
      } else {
        return {
          ...state,
          [action.key]: {
            ...state[action.key],
            cap: state[action.key].cap - state[action.key].cap * 0.1,
            exp: 0,
            rate: 0,
          },
        };
      }
    default:
      return state;
  }
}
