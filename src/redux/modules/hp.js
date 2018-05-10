const initialState = {
  maxHP: 100,
  currentHP: 100,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'EQUIP_ITEM':
      let armorHealth =
        state.maxHP +
        Math.round(
          Math.pow(1.2, action.item.upgradeTimes) * action.item.healthBase,
        );
      switch (action.item.category) {
        case 'armors':
          return {
            ...state,
            maxHP: armorHealth,
          };
        default:
          return state;
      }
    case 'UNEQUIP_ITEM':
      let armorHealthx =
        state.maxHP -
        Math.round(
          Math.pow(1.2, action.item.upgradeTimes) * action.item.healthBase,
        );

      switch (action.item.category) {
        case 'armors':
          return {
            ...state,
            maxHP: armorHealthx,
          };
        default:
          return state;
      }
    case 'INN_BUY':
    case 'HEAL':
      return action.item.restore <= 1
        ? {
            ...state,
            currentHP: Math.ceil(state.maxHP * action.item.restore),
          }
        : {
            ...state,
            currentHP:
              state.currentHP + action.item.restore <= state.maxHP
                ? state.currentHP + action.item.restore
                : state.maxHP,
          };
    case 'HP_REGEN_BATTLE':
      return {
        ...state,
        currentHP:
          state.currentHP + action.regen <= state.maxHP
            ? state.currentHP + action.regen
            : state.maxHP,
      };
    case 'DRAIN_LIFE':
      return action.payload.character === 'player'
        ? {
            ...state,
            currentHP:
              state.currentHP + action.payload.value <= state.maxHP
                ? state.currentHP + action.payload.value
                : state.maxHP,
          }
        : state;

    case 'SUFFER_DAMAGE':
      return {
        ...state,
        currentHP: state.currentHP - action.damage,
      };

    case 'INCREMENT_ATTRIBUTE':
      return action.attribute === 'vitality'
        ? {
            ...state,
            maxHP: state.maxHP + 5,
            currentHP: state.currentHP + 5,
          }
        : state;

    case 'END_BATTLE_VICTORY':
    case 'END_BATTLE_DEFEAT':
      return {
        ...state,
        currentHP: state.maxHP,
      };

    default:
      return state;
  }
};
