import React, { Component } from 'react';
import StoryContainer from './story/AppContainer';
import TrainingContainer from './training/containers/TrainingContainer';
import App from './components/App';
import { Tab, Button } from 'semantic-ui-react';
import { connect } from 'react-redux'
import {openModal, closeModal} from './redux/modules/modal'
import Modal from './components/Modal'
const panes = [
  {
    menuItem: 'Physical Training',
    pane: { key: 'Physical Training', content: <App /> },
  },
  {
    menuItem: 'Story',
    pane: { active: true, key: 'Story', content: <StoryContainer /> },
  },
  {
    menuItem: 'Magic Training',
    pane: { key: 'Magic Training', content: <TrainingContainer /> },
  },
];

class IndexContainer extends Component {
  render() {
    return (
      <div>
        <Tab menu={{ text: true }} panes={panes} renderActiveOnly={false} />
        <Modal modal={this.props.modal} openModal={this.props.openModal} closeModal={this.props.closeModal} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal,
})


export default connect(mapStateToProps, {openModal, closeModal})(IndexContainer)
