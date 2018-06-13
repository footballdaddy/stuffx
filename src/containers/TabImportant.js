import React from 'react'
import { Tab } from 'semantic-ui-react'
import EquipmentPanel from './EquipmentPanel';

const panes = [
  { menuItem: 'Tab 1', render: () => <Tab.Pane><EquipmentPanel /></Tab.Pane> },
  { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
]

const TabExampleBasic = () => <div className="tab-important">
  <Tab panes={panes} />
  </div>

export default TabExampleBasic
