import React from 'react';
import EquipmentPanel from './EquipmentPanel';
import StatsPanel from './StatsPanel';
import TraitsContainer from './TraitsContainer';
import { Tabs, TabSection } from '../components/Tabs/Tabs';

const TabImportant = () => (
  <div className="tab-important">
    <Tabs type="highlight">
      <TabSection name="Inventory">
        <EquipmentPanel />
      </TabSection>
      <TabSection name="Stats">
        <StatsPanel />
      </TabSection>
      <TabSection name="Traits">
        <TraitsContainer />
      </TabSection>
    </Tabs>
  </div>
);

export default TabImportant;
