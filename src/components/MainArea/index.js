import React, { Component } from 'react';
import { Tabs, TabSection } from '../Tabs/Tabs';

class MainArea extends Component {

  render() {

    return (
      <div className="home-page-container">
      <div id="grad1"></div>

        <Tabs type="highlight">
          <TabSection name="Locations">A 1</TabSection>
          <TabSection name="Amenities">A 2</TabSection>
          <TabSection name="Type">A 3</TabSection>
        </Tabs>
      </div>
    );
  }
}

export default MainArea;
