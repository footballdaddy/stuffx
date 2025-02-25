import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import {
  getStatData,
  getGameData,
  getEnemyData,
  getSkillData,
  getMagicData,
} from '../selectors';
import {
  incrementValue,
  calculateAttack,
  calculateHealth,
  calculateDefense,
  calculateSpiritLevel,
  enemyAttacks,
} from '../training/redux/modules/stats';

import { victory, defeat } from '../redux/modules/game';
import { decrementCoolDown } from '../redux/modules/skills';
import {
  nextEnemy,
  playerAttacks,
  increaseEnemyCounter,
  calculateEnemyHealth,
} from '../redux/modules/enemy';

export default function* gameLoop() {
  const frameRate = 50;
  let lastUpdateTime = Date.now();
  let currentTime;
  let deltaTime;
  // let training;
  let statData = yield select(getStatData);
  let gameData = yield select(getGameData);
  let enemyData = yield select(getEnemyData);
  let skillData = yield select(getSkillData);
  let magicData = yield select(getMagicData);


  // Game Loop runs at 60 fps (may be an option set by the user later)

  function* update() {
    while (true) {
      let attackStat = 0;
      let defenseStat = 0;
      statData = yield select(getStatData);
      gameData = yield select(getGameData);
      enemyData = yield select(getEnemyData);
      skillData = yield select(getSkillData);
      magicData = yield select(getMagicData);
      currentTime = Date.now();
      deltaTime = currentTime - lastUpdateTime;
      lastUpdateTime = currentTime;
      // console.log(enemyData.stats.defense);
      if (gameData.isFighting) {
        if (statData.health.currenthealth > 0)
          yield put(
            playerAttacks(
              statData.attack.stat * frameRate / 1000,
              enemyData.stats.defense * frameRate / 1000,
            ),
          );
        else {
          yield put(defeat());
        }
        if (enemyData.health > 0) {
          yield put(
            enemyAttacks(
              enemyData.stats.strength * frameRate / 1000,
              statData.defense.stat * frameRate / 1000,
            ),
          );
        } else {
          yield put(victory());
          yield put(increaseEnemyCounter());
          yield put(nextEnemy());
        }
      }
      //  training = Object.keys(magicData);
      //  awareness, exploration
      for (let i = 0; i < statData.elements.length; i++) {
          for (let j = 0; j < Object.keys(magicData).length; j++) {
            attackStat =
            attackStat +
            magicData[Object.keys(magicData)[j]].exp[statData.elements[i]] /
              magicData[Object.keys(magicData)[j]].cap[statData.elements[i]] *
              magicData[Object.keys(magicData)[j]].value[statData.elements[i]];
          defenseStat =
          magicData[Object.keys(magicData)[j]].exp[statData.elements[i]] /
          magicData[Object.keys(magicData)[j]].cap[statData.elements[i]] *
          magicData[Object.keys(magicData)[j]].value[statData.elements[i]];
        // console.log(magicData[Object.keys(magicData)[j]].rate[statData.elements[i]])
        // console.log(statData.elements[i])
            if (magicData[Object.keys(magicData)[j]].rate[statData.elements[i]] > 0) {
              // Object.keys(magicData)method, element, value
              yield put(
                incrementValue(
                  Object.keys(magicData)[j], statData.elements[i],
                  magicData[Object.keys(magicData)[j]].rate[statData.elements[i]] * frameRate * deltaTime / 1000,
                ),
              );
            }

          }

        }


      attackStat = attackStat + 10;
      defenseStat = defenseStat + 10;
      yield put(calculateAttack(attackStat));
      yield put(calculateDefense(defenseStat));
      // TODO: ENERGYRATE necessary?
      yield put(
        calculateSpiritLevel(5 * statData.energy.rateSpirit * (deltaTime / 1000)),
      );

      if(statData.health.currenthealth !== statData.health.stat)
      yield put(calculateHealth((defenseStat / 20) * (deltaTime / 1000)));
      if(enemyData.health !== enemyData.stats.maxHealth)
      yield put(
        calculateEnemyHealth((enemyData.stats.defense / 20) * (deltaTime / 1000)),
      );
      for (let key in skillData) {
        if (skillData[key].currentCoolDown > 0) {
          yield put(
            decrementCoolDown(key, skillData[key].rate * deltaTime / 1000),
          );
        }
      }
      yield delay(1000 / frameRate);
    }
  }
  yield call(update);
}
