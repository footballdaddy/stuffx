import React, { Fragment } from 'react';

const ItemDescription = ({ hoveredItem }) => (
  <div className="item-description">
    <span className="item-name">
      {hoveredItem.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span> <br/>
    {['necklaces', 'rings', 'potions', 'oils'].includes(
      hoveredItem.category,
    ) ? (
      <Fragment>
      <span>{`Description: ${hoveredItem.description}`}</span>
      <span>{`Block Chance: ${hoveredItem.statsIncrease.blockChance}`}</span>
      <span>{`Damage: ${hoveredItem.statsIncrease.damage}`}</span>
      <span>{`Hit Chance: ${hoveredItem.statsIncrease.hitChance}`}</span>
      <span>{`Armor: ${hoveredItem.statsIncrease.armor}`}</span>
      <span>{`Life Drain: ${hoveredItem.statsIncrease.lifeDrain}`}</span>
      <span>{`Critical Chance: ${hoveredItem.statsIncrease.criticalChance}`}</span>
      </Fragment>
    ) : ['armors'].includes(
      hoveredItem.category,
    ) ? (
      <Fragment>
        <span>{`Armor: ${hoveredItem.armor}`}&nbsp;&nbsp;</span>
        <span>{`Health: ${hoveredItem.healthBase}`}</span>
        <span>
          {` Hit chance penalty: -${hoveredItem.hitChancePenalty}`}&nbsp;
        </span>
        <span>{`Upgrade Times: ${hoveredItem.upgradeTimes}`}</span>

      </Fragment>
    ) : ['shields'].includes(
      hoveredItem.category,
    ) && hoveredItem.subCategory == 'none' ? (
      <Fragment>
        <span>{`Health: ${hoveredItem.healthBase}`}</span>
        <span>
          {` Hit chance penalty: -${hoveredItem.hitChancePenalty}`}&nbsp;
        </span>
        <span>{`Upgrade Times: ${hoveredItem.upgradeTimes}`}</span>
      </Fragment>
    ) : hoveredItem.category === 'shields' &&
    hoveredItem.subCategory === 'weapon' ? (
      <Fragment>
        <span>
          {`Damage range: ${hoveredItem.dmgRange[0] + hoveredItem.dmgRange[0] *.2 *hoveredItem.upgradeTimes} - ${
            hoveredItem.dmgRange[1] + hoveredItem.dmgRange[0] *.2 *hoveredItem.upgradeTimes
          }`}&nbsp;&nbsp;
        </span>
        <span>{`Wait Penalty: ${hoveredItem.attackSpeed} sec`}</span>
        <span>{`Critical Chance Bonus: ${hoveredItem.criticalChance}`}</span>
        <span>{`Upgrade Times: ${hoveredItem.upgradeTimes}`}</span>

      </Fragment>
    ) : hoveredItem.category === 'weapons' ? (
      <Fragment>
        <span>
          {`Damage range: ${hoveredItem.dmgRange[0] + hoveredItem.dmgRange[0] *.2 *hoveredItem.upgradeTimes} - ${
            hoveredItem.dmgRange[1] + hoveredItem.dmgRange[0] *.2 *hoveredItem.upgradeTimes
          }`}&nbsp;&nbsp;
        </span>
        <span>{`Accuracy Bonus: ${hoveredItem.hitChance}`}</span>
        <span>{`Wait Penalty: ${hoveredItem.attackSpeed} sec`}</span>
        <span>{`Critical Chance Bonus: ${hoveredItem.criticalChance}`}</span>
        <span>{`Upgrade Times: ${hoveredItem.upgradeTimes}`}</span>
      </Fragment>
    ) : hoveredItem.category === 'inn' && hoveredItem.restore > 1 ? (
      <span>{`Restore ${hoveredItem.restore} HP.`}&nbsp;&nbsp;</span>
    ) : hoveredItem.category === 'inn' && hoveredItem.restore <= 1 ? (
      <span>{hoveredItem.description}</span>
    ) : (
      ''
    )}
  </div>
);

export default ItemDescription;
