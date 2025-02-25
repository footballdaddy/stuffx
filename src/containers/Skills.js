import React from 'react';
import { connect } from 'react-redux';

import {
  unequipItem,
  calculateAttributeBonus,
  addEffect,
  restoreHP,
  showDescription,
} from '../redux/modules/actions';
import { startSkill, removeSkillEffects } from '../redux/modules/skills';

class Skills extends React.Component {
  useItem = (elx, key) => {
    this.props.startSkill(key);
    if (typeof elx.restore !== 'undefined') {
      this.props.restoreHP(elx);
    }

    if (typeof elx.effect !== 'undefined') {
      // console.log('hi');
      this.props.addEffect(elx, key);
    }
    this.props.calculateAttributeBonus();
  };



  render() {
    return (
      <div>
        {Object.keys(this.props.skills).map((skill, i) => (
          <div key={i}>
            {this.props.skills[skill].level > 0 &&
            this.props.traits[this.props.skills[skill].from].level > 0 ? (
              <div>
                Skill: {this.props.skills[skill].name}
                Current Time left: {this.props.skills[skill].currentCoolDown}
                ActiveCoolDown Time left:{' '}
                {this.props.skills[skill].activeCoolDown}
                Base Cooldown: {this.props.skills[skill].baseCoolDown}
                {this.props.skills[skill].currentCoolDown <= 0 &&
                this.props.opponnent != 'none' ? (
                  <button
                    className="use-btn"
                    onClick={() =>
                      this.useItem(this.props.skills[skill], skill)
                    }
                  >
                    {this.props.skills[skill].name}
                  </button>
                ) : (
                  <button className="use-btn">
                    {this.props.skills[skill].name}
                    {this.props.skills[skill].currentCoolDown}
                  </button>
                )}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  equipped: state.equip.equipped,
  temporaryEffects: state.tempeffects.temporaryEffects,
  hoveredItem: state.description.hoveredItem,
  skills: state.skills,
  traits: state.playerstats.traits,
});

export default connect(mapStateToProps, {
  unequipItem,
  addEffect,
  calculateAttributeBonus,
  restoreHP,
  showDescription,
  removeSkillEffects,
  startSkill,
})(Skills);
