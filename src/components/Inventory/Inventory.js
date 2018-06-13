import React, { Component } from 'react';
import { Button, Image, Transition, Grid } from 'semantic-ui-react';

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
      <Transition duration={{ hide: 500, show: 500 }} visible={true}>
        <Grid.Column>
          <div className="flex-container-column">
            <div
              className={`equipped-item-icon id_${this.props.value.id}`}
              onMouseEnter={() =>
                this.props.showItemDescription(this.props.value)
              }
              onMouseLeave={() => this.props.showItemDescription('')}
            />
            <div>
              <Button
                color="green"
                content="Equip"
                onClick={() => this.props.onClick(this.props.value)}
                // style={{ position: 'absolute', right: '10px', bottom: '10px' }}
              />
            </div>

            {this.props.value.name}
          </div>
        </Grid.Column>
      </Transition>
    );
  }
}
