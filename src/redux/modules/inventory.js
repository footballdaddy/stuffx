const initialState = {
  inventory: [
          {
        id: 14,
        category: 'necklaces',
        name: 'Necklace of strength',
        statsIncrease: {
          blockChance: 0,
          damage: 10,
          hitChance: 0,
          armor: 0,
          lifeDrain: 0,
          criticalChance: 0
        },
        buyValue: 500,
        sellValue: 150,
        baseDamageBonus: 10,
        upgradeTimes: 0,
        description: '+10 Damage.',
        quantity: 1
      }

  ],
};

function immutableMove(arr, from, to) {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) {
      prev.push(current);
    }
    if (idx === from) {
      return prev;
    }
    if (from < to) {
      prev.push(current);
    }
    if (idx === to) {
      prev.push(self[from]);
    }
    if (from > to) {
      prev.push(current);
    }
    return prev;
  }, []);
}
// moveArraysElementPosition([10, 20, 30, 40, 50], 0, 2); // [20, 30, 10, 40, 50]

export const upgradeItem = item => ({
  type: 'UPGRADE_ITEM',
  item,
});

export const reOrder = list => {
  return {
    type: 'REORDER_INVENTORY',
    payload: { list },
  };
};
export const reOrderInventoryEquip = (item, item2Index) => {
  return {
    type: 'REORDER_INVENTORY_EQUIP',
    item,
    item2Index,
  };
};

export const addToQueue = queuedMovie => {
  return {
    type: 'ADD_TO_QUEUE',
    payload: { queuedMovie },
  };
};

export const removeFromQueue = unqueuedMovieId => {
  return {
    type: 'REMOVE_FROM_QUEUE',
    payload: { unqueuedMovieId },
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REORDER_INVENTORY':
      return {
        ...state,
        inventory: action.payload.list,
      };
    case 'REORDER_INVENTORY_EQUIP':
      const fromIndex = state.inventory
        .map(item => item.id)
        .indexOf(action.item.id);

      let newInvArray = immutableMove(
        state.inventory,
        fromIndex,
        action.item2Index,
      );
      return action.item2Index >= 0
        ? {
            ...state,
            inventory: newInvArray,
          }
        : state;

    case 'BUY_ITEM':
    case 'UNEQUIP_ITEM':
      const addedItem = state.inventory.filter(
        item => item.id === action.item.id,
      );
      const addedIndex = state.inventory
        .map(item => item.id)
        .indexOf(action.item.id);
        return addedItem.length === 0
        ? Object.assign({}, state, {
            inventory: [...state.inventory, { ...action.item, quantity: 1 }],
          })
        : Object.assign({}, state, {
            inventory: Object.assign([...state.inventory], {
              [addedIndex]: {
                ...action.item,
                quantity: ++addedItem[0].quantity,
                upgradeTimes: state.inventory[addedIndex].upgradeTimes
              },
            }),
          });
    case 'UPGRADE_ITEM':
      let addedItem1 = state.inventory.filter(
        item => item.id === action.item.id,
      );

      let addedIndex1 = state.inventory
        .map(item => item.id)
        .indexOf(action.item.id);

      return Object.assign({}, state, {
        inventory: Object.assign([...state.inventory], {
          [addedIndex1]: {
            ...action.item,
            upgradeTimes: ++addedItem1[0].upgradeTimes,
          },
        }),
      });
    case 'SELL_ITEM':
    case 'EQUIP_ITEM':
      const removedIndex = state.inventory
        .map(item => item.id)
        .indexOf(action.item.id);
      return action.item.quantity > 1
        ? Object.assign({}, state, {
            inventory: Object.assign([...state.inventory], {
              [removedIndex]: {
                ...action.item,
                quantity: --action.item.quantity,
              },
            }),
          })
        : {
            ...state,
            inventory: [
              ...state.inventory.slice(0, removedIndex),
              ...state.inventory.slice(removedIndex + 1),
            ],
          };
    case 'END_GAME':
      return state;

    default:
      return state;
  }
};
