import { connect } from 'react-redux';
import Traits from '../components/Traits';
import {
  incrementTrait,
  levelUpTrait,
  calculateTraitBonus,
} from '../redux/modules/playerstats';
import { calculateAttributeBonus } from '../redux/modules/actions';

const mapStateToProps = state => ({
  traits: state.playerstats.traits,
  traitPoints: state.playerstats.traitPoints,
});

export default connect(mapStateToProps, {
  incrementTrait,
  levelUpTrait,
  calculateTraitBonus,
  calculateAttributeBonus,
})(Traits);
