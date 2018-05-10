const initialState = {
  fury: {
    name: 'fury',
    rate: 1,
    level: 1,
    currentCoolDown: 0,
    baseCoolDown: 14,
    activeCoolDown: 5,
    baseActiveCoolDown: 2,
    effect: {
      blockChance: 0,
      damage: 500,
      hitChance: 0,
      armor: 0,
      lifeDrain: 0,
      criticalChance: 0,
    },
    from: 'power2',
    showSkill: 'false',
    isActive: 'false',
  },
  vigilance: {
    name: 'vigilance',
    rate: 1,
    level: 1,
    currentCoolDown: 0,
    baseCoolDown: 8,
    activeCoolDown: 5,
    baseActiveCoolDown: 3,
    effect: {
      blockChance: 500,
      damage: 0,
      hitChance: 500,
      armor: 0,
      lifeDrain: 0,
      criticalChance: 0,
    },
    from: 'focus2',
    showSkill: 'false',
    isActive: 'false',
  },
  criticalDrain: {
    name: 'criticalDrain',
    rate: 1,
    level: 1,
    currentCoolDown: 0,
    baseCoolDown: 8,
    activeCoolDown: 5,
    baseActiveCoolDown: 3,
    effect: {
      blockChance: 0,
      damage: 0,
      hitChance: 0,
      armor: 0,
      lifeDrain: 500,
      criticalChance: 500,
    },
    from: 'technique2',
    showSkill: 'false',
    isActive: 'false',
  },
};
// to fix
export const calculateActiveCoolDown = key => {
  return (dispatch, getState) => {
    const state = getState();

    if (state.skills[key].activeCoolDown > 0) {
      // console.log('billy');
      dispatch({ type: 'DECREMENT_ACTIVE_COOLDOWN', key });
    } else {
      dispatch({ type: 'REMOVE_SKILL_EFFECTS', key });
      dispatch({ type: 'CALCULATE_ATTRIBUTE_BONUS' });
    }
  };
};

export const decrementCoolDown = (key, changeTime) => ({
  type: 'DECREMENT_COOLDOWN',
  key,
  changeTime,
});
export const decrementActiveCoolDown = key => ({
  type: 'DECREMENT_ACTIVE_COOLDOWN',
  key,
});

export const startSkill = key => ({
  type: 'START_SKILL',
  key,
});
export const stopSkill = key => ({
  type: 'STOP_SKILL',
  key,
});

export const removeSkillEffects = key => ({
  type: 'REMOVE_SKILL_EFFECTS',
  key,
});

export const calculateChangeTime = changeTime => ({
  type: 'CALCULATE_CHANGE_TIME',
  changeTime,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_SKILL':
      if (state[action.key].currentCoolDown <= 0) {
        return {
          ...state,
          [action.key]: {
            ...state[action.key],
            currentCoolDown: state[action.key].baseCoolDown,
            activeCoolDown: state[action.key].baseActiveCoolDown,
            isActive: 'true',
          },
        };
      } else {
        return state;
      }
    // case 'INCREMENT_TRAIT':
    //   let showSkillObject = { ...state };
    //   for (let key in showSkillObject) {
    //     if (showSkillObject[key].from == action.trait) {
    //       showSkillObject =  {...showSkillObject, [showSkillObject[key].showSkill]: 'true'}
    //     }
    //     // console.log([showSkillObject[key].showSkill])
    //     console.log(showSkillObject[key].from)
    //     console.log(action.trait)
    //     console.log(showSkillObject[key].from == action.trait)
    //     // console.log(key == action.trait)

    //   }
    //   // console.log(showSkillObject);

    //   return {
    //     ...state, ...showSkillObject
    //   };
    case 'REMOVE_EFFECT':
    case 'END_BATTLE_VICTORY':
    case 'END_BATTLE_DEFEAT':
      return state;
    case 'DECREMENT_COOLDOWN':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          currentCoolDown:
            state[action.key].currentCoolDown - action.changeTime,
        },
      };
    case 'DECREMENT_ACTIVE_COOLDOWN':
      if (state[action.key].activeCoolDown > 0) {
        return {
          ...state,
          [action.key]: {
            ...state[action.key],
            activeCoolDown: state[action.key].activeCoolDown - 1,
          },
        };
      } else {
        return state;
      }

    case 'STOP_SKILL':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          isActive: '',
        },
      };

    default:
      return state;
  }
};
