import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import StoryContainer from './story/AppContainer'
import TrainingContainer from './training/containers/TrainingContainer'
import App from './components/App'
const panes = [
  { menuItem: 'Story', render: () => <Tab.Pane attached={false}><StoryContainer /></Tab.Pane> },
  { menuItem: 'Battle', render: () => <Tab.Pane attached={false}><App /></Tab.Pane> },
  { menuItem: 'Ki Training', render: () => <Tab.Pane attached={false}><TrainingContainer /></Tab.Pane> },
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
