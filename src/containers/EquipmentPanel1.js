import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  unequipItem,
  calculateAttributeBonus,
  addEffect,
  restoreHP,
  showDescription,
} from '../redux/modules/actions';
import { upgradeItem } from '../redux/modules/inventory';

import ItemDescription from './ItemDescription';

class EquipPanel extends React.Component {
  showItemDescription = item => {
    this.props.showDescription(item);
  };

  handleClick = el => {
    this.props.unequipItem(el);
    this.props.calculateAttributeBonus();
  };

  useItem = el => {
    if (typeof el.restore !== 'undefined') {
      this.props.restoreHP(el);
    }

    if (
      typeof el.effect !== 'undefined' &&
      this.props.temporaryEffects.includes(el.effect) === false
    ) {
      this.props.addEffect(el);
    }
    this.props.calculateAttributeBonus();
  };

  render() {
    const { equipped, hoveredItem } = this.props;
    const categoriesArray = [
      'weapons',
      'armors',
      'shields',
      'necklaces',
      'rings',
    ];
    const battleGear = equipped.filter(
      item => item.category !== 'potions' && item.category !== 'oils',
    );

    return (
      <Fragment>
        <ItemDescription hoveredItem={hoveredItem} />
        <div className="flex-container">
          {categoriesArray.map((slot, i) => {
            let matchingItem = equipped.find(item => item.category === slot);
            console.log(matchingItem)
            let itemClassname = matchingItem
              ? `id_${matchingItem.id}`
              : `empty-slot ${slot}`;
            let slotClassname = `equipped-item ${itemClassname}`;
            return (
              <div
                key={i}
                className={slotClassname}
                onClick={() => {
                  this.handleClick(matchingItem);
                  this.showItemDescription('');
                }}
                onMouseEnter={() => this.showItemDescription(matchingItem)}
                onMouseLeave={() => this.showItemDescription('')}
              />
            );
          })}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  equipped: state.equip.equipped,
  temporaryEffects: state.tempeffects.temporaryEffects,
  hoveredItem: state.description.hoveredItem,
});

export default connect(mapStateToProps, {
  unequipItem,
  addEffect,
  calculateAttributeBonus,
  restoreHP,
  showDescription,
  upgradeItem,
})(EquipPanel);
