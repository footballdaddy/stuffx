import React from 'react';
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
import Inventory from '../components/Inventory';

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
        <div className="equip-panel">
          <ItemDescription hoveredItem={hoveredItem} />
          {categoriesArray.map((el, i) => (
            <div key={i} className={`empty-slot equipped-item ${el}`} />
          ))}
          {battleGear.map((el, i) => (
            <div key={i}>
              <div
                className={`used-slot equipped-item id_${el.id} ${el.category}`}
                onClick={() => {
                  this.handleClick(el);
                  this.showItemDescription('');
                }}
                onMouseEnter={() => this.showItemDescription(el)}
                onMouseLeave={() => this.showItemDescription('')}
              />
            </div>
          ))}
                    <div style={{ marginTop: '50px' }} />

<Inventory />
        </div>
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
