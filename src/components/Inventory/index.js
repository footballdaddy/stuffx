import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';
import Inventory from './Inventory';

import * as inventoryActions from '../../redux/modules/inventory';

import {
  equipItem,
  unequipItem,
  calculateAttributeBonus,
  showDescription,
} from '../../redux/modules/actions';
import { upgradeItem } from '../../redux/modules/inventory';

const SortableItem = SortableElement(({ value, equipItem, onClick, showItemDescription }) => (
  <Inventory equipItem={equipItem} value={value} onClick={onClick} showItemDescription={showItemDescription} />
));

const SortableList = SortableContainer(
  ({ items, equipItem, onClick, showItemDescription }) => {
    return (
      <div className={"flex-container-wrap"}>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={value}
            equipItem={equipItem}
            onClick={onClick}
            showItemDescription={showItemDescription}
          />
        ))}
      </div>
    );
  },
);

class SortableComponent extends Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    const reOrderedInventory = arrayMove(this.props.inventory, oldIndex, newIndex);
    this.props.dispatch(inventoryActions.reOrder(reOrderedInventory));
  };

  equipItem = unqueuedId => {
    this.props.dispatch(inventoryActions.removeFromQueue(unqueuedId));
  };

  handleClick = el => {
    let equippedOneAllowed = this.props.equipped.filter(
      item => item.category === el.category,
    );
    let addedIndex;
    if (equippedOneAllowed.length > 0) {
      addedIndex = this.props.inventory.map(item => item.id).indexOf(el.id);
      this.props.dispatch(unequipItem(equippedOneAllowed[0]));
      this.props.dispatch(
        inventoryActions.reOrderInventoryEquip(equippedOneAllowed[0], addedIndex),
      );
    }
    this.props.dispatch(equipItem(el));
    this.props.dispatch(calculateAttributeBonus());
  };

  showItemDescription = item => {

    this.props.dispatch(showDescription(item));

  };

  render() {
    return this.props.inventory.length ? (
      <SortableList
        equipItem={this.equipItem}
        axis={'xy'}
        items={this.props.inventory}
        onSortEnd={this.onSortEnd}
        onClick={this.handleClick}
        showItemDescription={this.showItemDescription}
      />
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    inventory: state.inventory.inventory || [],
    equipped: state.equip.equipped,
    gold: state.gold.gold,
  };
};
const ConnectedSortableComponent = connect(mapStateToProps)(SortableComponent);
export default ConnectedSortableComponent;
