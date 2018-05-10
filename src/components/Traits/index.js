import React, { Component } from 'react';

export default class Traits extends Component {
  calculateTrait = trait => {
    this.props.levelUpTrait(trait);
    this.props.calculateAttributeBonus();
  };
  render() {
    return (
      <div>
        {Object.keys(this.props.traits).map((trait, i) => (
          <div key={i}>
            <div>
              Skill: {this.props.traits[trait].name} Level{' '}
              {this.props.traits[trait].level}
              {this.props.traitPoints >= 1 && this.props.traits[trait].level < this.props.traits[trait].maxLevel && this.props.traits[trait].canLevel ? (
                <button
                  className="use-btn"
                  onClick={() => this.calculateTrait(trait)}
                >
                  + 1
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
