import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// Copmponents
import HeroBattleScreen from './HeroBattleScreen';
// import Console from './Console';
// import EquipmentPanel from './EquipmentPanel'
// Actions
import {
  chooseOpponent,
  calculateAttributeBonus,
  updateEquipped,
} from '../redux/modules/actions';

class Arena extends React.Component {
  componentDidMount = () => {
    const { equipped } = this.props;
    const battleGear = equipped.filter(
      item => item.category !== 'potions' && item.category !== 'oils',
    );
    // console.log(battleGear);
    this.props.updateEquipped(battleGear);
    this.props.calculateAttributeBonus();
    // this.props.chooseOpponent('opponentList');
  };

  render() {
    const { opponent } = this.props;
    return (
        <Fragment>
          <HeroBattleScreen />
            {/* <EquipmentPanel /> */}

        </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  opponent: state.opponent.opponent,
  equipped: state.equip.equipped,
});

export default connect(mapStateToProps, {
  calculateAttributeBonus,
  updateEquipped,
})(Arena);
