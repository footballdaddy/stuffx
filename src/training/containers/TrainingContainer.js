import { connect } from 'react-redux';
import Training from '../components/Training';
import * as actions from '../redux/modules/stats';

const mapStateToProps = state => ({
  stats: state.stats,
});

export default connect(mapStateToProps, actions)(Training);
