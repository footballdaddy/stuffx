import React, { Component } from 'react';

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove = () => {
    const { id } = this.props.value;
    this.props.removeMovie(id);
  };

  render() {
    return (
          <div className="item-inventory flex-container-column">
            <div
              className={`equipped-item-icon id_${this.props.value.id}`}
              // onMouseEnter={() =>
              //   this.props.showItemDescription(this.props.value)
              // }
              // onMouseLeave={() => this.props.showItemDescription('')}
            />
            <div>
              <button
                onClick={() => this.props.onClick(this.props.value)}
              >Equip</button>
            </div>
<div className="center-text">

            {this.props.value.name}
</div>
          </div>
    );
  }
}
