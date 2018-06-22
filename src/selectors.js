export const getStatData = state => state.stats;
export const getCurrentHealth = state => state.stats.currenthealth;
export const getMagicData = state => state.stats.magic;
export const getGameData = state => state.game;
export const getEnemyData = state => state.enemy;
export const getSkillData = state => state.skills;

// function* example {
//   for (let key in stats) {
//     if (stats[key].rate > 0) {
//       this.props.incrementValue(key);
//     }
//   }
// }

// for (let key in stats) {
//   if (stats[key].rate > 0) {
//     this.props.incrementValue(key);
//   }
// }
