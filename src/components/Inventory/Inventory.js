import React, { Component } from 'react';
import { Button, Popup } from 'semantic-ui-react';
import ItemDescription from '../../containers/ItemDescription';
export default class Inventory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className="item-inventory flex-container-column">
              <div style={{ marginTop: '50px' }} />

        <div
          className={`equipped-item-icon id_${this.props.value.id}`}
        />
        <div className="flex-container-column">
          <Button
            color="green"
            onClick={() => this.props.onClick(this.props.value)}
            content="Equip"
          />

          <Popup
            trigger={<Button color="teal" content="Info" />}
            content={<ItemDescription hoveredItem={this.props.value} />}
            on="click"
            position="top right"
          />
        </div>
        <div className="center-text">{this.props.value.name}</div>
      </div>
    );
  }
}
