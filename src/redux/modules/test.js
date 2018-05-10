function stage_and_level_from_points(exp) {
  var stage = Math.floor(Math.log10(exp))-1;
  var base_stage_xp = Math.pow(10, stage + 1)
  var level = Math.min(5, Math.floor(exp/base_stage_xp))
  return [stage, level];
}
ex 0:
11 exp
stage: 0
level: 1
base_stage_xp: 10
return [0, 1]


ex 1:
101 exp
stage: 1
base_stage_xp: 100
return:
[1, 1]

What I want?
When did I gain a lv?
When did I gain a stage?

11
101


if(state.stage < newStage)
gain 3 traitPoint
return

if(state.level < newLevel)
gaint 1 traitpoint
return