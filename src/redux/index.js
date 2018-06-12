import { combineReducers } from 'redux';
import game from './modules/game';
import enemy from './modules/enemy';
import exp from './modules/exp';
import gold from './modules/gold';
import hp from './modules/hp';
import inventory from './modules/inventory';
import logs from './modules/logs';
import tempeffects from './modules/tempeffects';
import equip from './modules/equip';
import description from './modules/description';
import playerstats from './modules/playerstats';
import opponent from './modules/opponent';
import skills from './modules/skills';
import story from '../story/reducers/story'
import stats from '../training/redux/modules/stats';

export default combineReducers({
  stats,
  game,
  enemy,
  exp,
  gold,
  hp,
  inventory,
  logs,
  tempeffects,
  equip,
  description,
  playerstats,
  opponent,
  skills,
  story
});
