export const statsInitialState = {
  energy: {
    rateSpirit: 1,
    exp: 0,
    value: 10,
    level: 10,
    cap: 100,
    stattype: 'energy',
  },
  rebirth: false,
  attack: {
    stat: 0,
  },
  defense: {
    stat: 0,
  },

  elements: ['normal', 'fire', 'earth', 'water', 'air'],
  elementUnlocks: {normal: true, fire: true, earth: true, water: true, air: false},

  // elementUnlocks:
  //   {
  //     normal: {
  //       text: 'Normal',
  //       value: 'Normal',
  //       unlocked: true,
  //     },
  //     fire: {
  //       text: 'Fire',
  //       value: 'Fire',
  //       unlocked: true,
  //     },
  //     earth: {
  //       text: 'Earth',
  //       value: 'Earth',
  //       unlocked: true,
  //     },
  //     water: {
  //       text: 'Water',
  //       value: 'Water',
  //       unlocked: true,
  //     },
  //     air: {
  //       text: 'Air',
  //       value: 'Air',
  //       unlocked: true,
  //     }
  //   },
  elementActive: 'normal',
  magic: {
    awareness: {
      rate: {normal: 0, fire: 0, earth: 0, water: 0, air: 0},
      value: {normal: 150, fire: 150, earth: 150, water: 150, air: 150},
      attackMultiplier: {normal: 1, fire: 1, earth: 1, water: 1, air: 1},
      defenseMultiplier: {normal: 1, fire: 1, earth: 1, water: 1, air: 1},
      cap: {normal: 2500, fire: 2500, earth: 2500, water: 2500, air: 2500},
      exp: {normal: 0, fire: 0, earth: 0, water: 0, air: 0},
      rateGrowth: {normal: .2, fire: .2, earth: .2, water: .2, air: .2},
    },
    exploration: {
      rate: {normal: 0, fire: 0, earth: 0, water: 0, air: 0},
      value: {normal: 150, fire: 150, earth: 150, water: 150, air: 150},
      attackMultiplier: {normal: 1, fire: 1, earth: 1, water: 1, air: 1},
      defenseMultiplier: {normal: 1, fire: 1, earth: 1, water: 1, air: 1},
      cap: {normal: 2500, fire: 2500, earth: 2500, water: 2500, air: 2500},
      exp: {normal: 0, fire: 0, earth: 0, water: 0, air: 0},
      rateGrowth: {normal: .2, fire: .2, earth: .2, water: .2, air: .2},
    },
    discovery: {
      rate: {normal: 0, fire: 0, earth: 0, water: 0, air: 0},
      value: {normal: 150, fire: 150, earth: 150, water: 150, air: 150},
      attackMultiplier: {normal: 1, fire: 1, earth: 1, water: 1, air: 1},
      defenseMultiplier: {normal: 1, fire: 1, earth: 1, water: 1, air: 1},
      cap: {normal: 2500, fire: 2500, earth: 2500, water: 2500, air: 2500},
      exp: {normal: 0, fire: 0, earth: 0, water: 0, air: 0},
      rateGrowth: {normal: .2, fire: .2, earth: .2, water: .2, air: .2},
    },
    understanding: {
      rate: {normal: 0, fire: 0, earth: 0, water: 0, air: 0},
      value: {normal: 150, fire: 150, earth: 150, water: 150, air: 150},
      attackMultiplier: {normal: 1, fire: 1, earth: 1, water: 1, air: 1},
      defenseMultiplier: {normal: 1, fire: 1, earth: 1, water: 1, air: 1},
      cap: {normal: 2500, fire: 2500, earth: 2500, water: 2500, air: 2500},
      exp: {normal: 0, fire: 0, earth: 0, water: 0, air: 0},
      rateGrowth: {normal: .2, fire: .2, earth: .2, water: .2, air: .2},
    },
    admiration: {
      rate: {normal: 0, fire: 0, earth: 0, water: 0, air: 0},
      value: {normal: 150, fire: 150, earth: 150, water: 150, air: 150},
      attackMultiplier: {normal: 1, fire: 1, earth: 1, water: 1, air: 1},
      defenseMultiplier: {normal: 1, fire: 1, earth: 1, water: 1, air: 1},
      cap: {normal: 2500, fire: 2500, earth: 2500, water: 2500, air: 2500},
      exp: {normal: 0, fire: 0, earth: 0, water: 0, air: 0},
      rateGrowth: {normal: .2, fire: .2, earth: .2, water: .2, air: .2},
    },
    transformation: {
      rate: {normal: 0, fire: 0, earth: 0, water: 0, air: 0},
      value: {normal: 150, fire: 150, earth: 150, water: 150, air: 150},
      attackMultiplier: {normal: 1, fire: 1, earth: 1, water: 1, air: 1},
      defenseMultiplier: {normal: 1, fire: 1, earth: 1, water: 1, air: 1},
      cap: {normal: 2500, fire: 2500, earth: 2500, water: 2500, air: 2500},
      exp: {normal: 0, fire: 0, earth: 0, water: 0, air: 0},
      rateGrowth: {normal: .2, fire: .2, earth: .2, water: .2, air: .2},
    },
    mastery: {
      rate: {normal: 0, fire: 0, earth: 0, water: 0, air: 0},
      value: {normal: 150, fire: 150, earth: 150, water: 150, air: 150},
      attackMultiplier: {normal: 1, fire: 1, earth: 1, water: 1, air: 1},
      defenseMultiplier: {normal: 1, fire: 1, earth: 1, water: 1, air: 1},
      cap: {normal: 2500, fire: 2500, earth: 2500, water: 2500, air: 2500},
      exp: {normal: 0, fire: 0, earth: 0, water: 0, air: 0},
      rateGrowth: {normal: .2, fire: .2, earth: .2, water: .2, air: .2},
    },
  },
  health: {
    stat: 100,
    currenthealth: 10,
  },
};
