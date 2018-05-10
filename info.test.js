info:
if (
  opponent.effects.filter(effect => effect.name === 'Poison')
    .length === 0 &&
  temporaryEffects.includes('poison')
) {
  logMessage([
    'player',
    "Opponent has been poisoned. Poisoned enemies receive 15% of Hero's base damage each turn.",
  ]);
  addOpponentEffect({
    name: 'Poison',
    dmgPerTurn: Math.round(0.15 * inflictedDamage),
    duration: 20,
  });
}

if (
  temporaryEffects.includes({ dmgIncrease: ['undead', 0.25] }) &&
  opponent.type === 'undead'
) {
  minDamage *= 1.25;
  maxDamage *= 1.25;
}


case 'INCREMENT_TRAIT':
let showSkillObject = { ...state };
for (let key in showSkillObject) {
  if (showSkillObject[key].from == action.trait) {
    showSkillObject =  {...showSkillObject, [showSkillObject[key].showSkill]: 'true'}
  }
  // console.log([showSkillObject[key].showSkill])
  console.log(showSkillObject[key].from)
  console.log(action.trait)
  console.log(showSkillObject[key].from == action.trait)
  // console.log(key == action.trait)

}
// console.log(showSkillObject);

return {
  ...state, ...showSkillObject
};