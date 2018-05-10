const initialState = {
  damage: {
    name: 'damage',
    level: 0,
    multiplier: 1,
  },
  hitChance: {
    name: 'hitChance',
    level: 0,
    multiplier: 1,
  },
  blockChance: {
    name: 'blockChance',
    level: 0,
    multiplier: 1,
  },
  armor: {
    name: 'armor',
    level: 0,
    multiplier: 1,
  },
  lifeDrain: {
    name: 'lifeDrain',
    level: 0,
    multiplier: 1,
  },
};

export const incrementTrait = trait => ({
  type: 'INCREMENT_TRAIT',
  trait,
});
export const decrementActiveCoolDown = key => ({
  type: 'DECREMENT_ACTIVE_COOLDOWN',
  key,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_TRAIT':
      return {
        ...state,
        [action.trait]: {
          ...state[action.trait],
          level: state[action.trait].level + 1,
        },
      };
    case 'ADD_TRAINING_LEVEL':
      return {
        ...state,
        maxProgressLv: state.maxProgressLv + 1,
        progressLv: state.progressLv + 1,
      };
    default:
      return state;
  }
};
