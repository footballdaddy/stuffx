import { connect } from 'react-redux';
import App from './App';
import * as actions from './reducers/story';

const mapStateToProps = state => ({
  story: state.story,
  stats: state.playerstats,
  gold: state.gold.gold,
});

export default connect(mapStateToProps, actions)(App);
