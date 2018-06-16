import React, { Component } from 'react';
import StoryContainer from './story/AppContainer';
import TrainingContainer from './training/containers/TrainingContainer';
import App from './components/App';
import { Tabs, TabSection } from './components/Tabs/Tabs';

class TabExampleActiveIndex extends Component {
  render() {
    return (
      <div>
        <Tabs type="text">
          <TabSection name="Story"><StoryContainer /></TabSection>
          <TabSection name="Battle"><App /></TabSection>
          <TabSection name="Ki Training"><TrainingContainer /></TabSection>
        </Tabs>
      </div>
    );
  }
}

export default TabExampleActiveIndex;
