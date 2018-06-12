// import React from 'react'
// import { Tab } from 'semantic-ui-react'

// const panes = [
//   { menuItem: 'Tab 1', render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane> },
//   { menuItem: 'Tab 2', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
//   { menuItem: 'Tab 3', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
// ]

// const TabExampleBorderless = () => (
//   <Tab menu={{ borderless: true, attached: false, tabular: false }} panes={panes} />
// )

// export default TabExampleBorderless

// import React, { Component } from 'react'
// import { Tab } from 'semantic-ui-react'

// const panes = [
//   { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
//   { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
//   { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
// ]

import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import AppContainer from './AppContainer'
const panes = [
  { menuItem: 'Tab 1', render: () => <Tab.Pane attached={false}><AppContainer /></Tab.Pane> },
  { menuItem: 'Tab 2', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
  { menuItem: 'Tab 3', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
]

class TabExampleActiveIndex extends Component {
  state = { activeIndex: 1 }

  handleRangeChange = e => this.setState({ activeIndex: e.target.value })
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

  render() {
    const { activeIndex } = this.state

    return (
      <div>
        <div>activeIndex: {activeIndex}</div>
        <input type='range' max='2' value={activeIndex} onChange={this.handleRangeChange} />
        <Tab menu={{ secondary: true }}  panes={panes} activeIndex={activeIndex} onTabChange={this.handleTabChange} />
      </div>
    )
  }
}

export default TabExampleActiveIndex
