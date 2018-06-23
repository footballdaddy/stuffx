const initialState = { gold: 30000 };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'BUY_ITEM':
    case 'UPGRADE_ITEM':
    case 'INN_BUY':
      return { ...state, gold: state.gold - action.item.buyValue };

    case 'SELL_ITEM':
      return { ...state, gold: state.gold + action.item.sellValue };

    case 'END_BATTLE_VICTORY':
    case 'ADD_REWARD':
      if (action.reward.hasOwnProperty('gold')) {
        return {
          ...state,
          gold: state.gold + action.reward.gold,
        };
      } else {
        return state;
      }
    case 'END_BATTLE_DEFEAT':
      return { ...state, gold: state.gold };
    case 'END_GAME':
      return state;
    default:
      return state;
  }
};
