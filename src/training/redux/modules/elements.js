const initialState = {
  awareness: {
    name: 'awareness',
    rate: 0,
    level: 1,
    value: 150,
    attack: 1,
    defense: 1,
    cap: 2500,
    capexp: 0,
    exp: 0,
    rateGrowth: 0.2,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {

  case 'typeName':
    return { ...state }

  default:
    return state
  }
}
