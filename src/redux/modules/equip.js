const initialState = {
  equipped: [  {
    id: 25,
    category: 'weapons',
    name: 'Dagger',
    buyValue: 50,
    sellValue: 25,
    hitChance: 800,
    dmgRange: [5, 10],
    upgradeTimes: 0,
    attackSpeed: 0,
    criticalChance: 400,
  },],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'EQUIP_ITEM':
      const equippedItem = state.equipped.filter(
        item => item.id === action.item.id,
      );

      const equippedIndex = state.equipped
        .map(item => item.id)
        .indexOf(action.item.id);

      return equippedItem.length === 0
        ? Object.assign({}, state, {
            equipped: [...state.equipped, { ...action.item, quantity: 1 }],
          })
        : Object.assign({}, state, {
            equipped: Object.assign([...state.equipped], {
              [equippedIndex]: {
                ...action.item,
                quantity: ++equippedItem[0].quantity,
              },
            }),
          });

    case 'UNEQUIP_ITEM':
    case 'HEAL':
    case 'ADD_EFFECT':
    case 'REMOVE_ITEM':
      const unequippedItem = state.equipped.filter(
        item => item.id === action.item.id,
      );

      const unequippedIndex = state.equipped
        .map(item => item.id)
        .indexOf(action.item.id);

      return action.item.quantity > 1
        ? Object.assign({}, state, {
            equipped: Object.assign([...state.equipped], {
              [unequippedIndex]: {
                ...action.item,
                quantity: --unequippedItem[0].quantity,
              },
            }),
          })
        : {
            ...state,
            equipped: [
              ...state.equipped.slice(0, unequippedIndex),
              ...state.equipped.slice(unequippedIndex + 1),
            ],
          };
    case 'END_GAME':
      return state;

    default:
      return state;
  }
};
