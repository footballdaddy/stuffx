const initialState = {
  exp: 10,
  stage: 0,
  level: 0,
  nextLevel: 100,
  isVictoryScreenOpen: false,
  isDefeatScreenOpen: false,
};

function stage_and_level_from_points(points) {
  let stage = Math.floor(Math.log10(points)) - 1;
  let base_stage_xp = Math.pow(10, stage + 1);
  let level = Math.min(5, Math.floor(points / base_stage_xp));
  return [stage, level];
}

const levelThresholds = {
  1: 100,
  2: 200,
  3: 350,
  4: 500,
  5: 700,
  6: 1000,
  7: 1500,
  8: 2100,
  9: 3000,
  10: 4000,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'END_BATTLE_VICTORY':
      const newStageLv = stage_and_level_from_points(
        state.exp + action.reward.XP,
      );

      const isLevelGained =
        [state.stage, state.level] >= levelThresholds[state.level];

      return {
        ...state,
        level: isLevelGained ? state.level + 1 : state.level,
        exp: isLevelGained
          ? state.exp + action.reward.XP - levelThresholds[state.level]
          : state.exp + action.reward.XP,
        nextLevel: isLevelGained
          ? levelThresholds[state.level + 1]
          : state.nextLevel,
        isVictoryScreenOpen: isLevelGained ? 'with-level-up' : 'no-level-up',
        lastReward: action.reward,
      };
    case 'END_BATTLE_DEFEAT':
      return {
        ...state,
        isDefeatScreenOpen: true,
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        isDefeatScreenOpen: false,
        isVictoryScreenOpen: false,
      };

    case 'END_GAME':
      return {
        ...state,
        isDefeatScreenOpen: false,
        isVictoryScreenOpen: false,
      };

    default:
      return state;
  }
};
