import React, { Component } from 'react';
import StoryContainer from './story/AppContainer';
import TrainingContainer from './training/containers/TrainingContainer';
import App from './components/App';
import { Tab } from 'semantic-ui-react';

const panes = [
  { menuItem: 'Physical Training', pane: { key: 'Physical Training', content: <App /> } },
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
    return <Tab menu={{ text: true }}  panes={panes} renderActiveOnly={false} />;
  }
}

export default IndexContainer;
