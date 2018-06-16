import React from 'react';
import { Tabs, TabSection } from '../components/Tabs/Tabs';
import Shop from './Shop'
import MagicShop from './MagicShop'
import Console from './Console'

const TabMisc = () => (
  <div className="tab-misc">
    <Tabs type="highlight">
      <TabSection name="Console">
        <Console />
      </TabSection>
      <TabSection name="Armor Shop">
        <Shop />
      </TabSection>
      <TabSection name="Magic Shop">
        <MagicShop />
      </TabSection>
    </Tabs>
  </div>
);

export default TabMisc;
