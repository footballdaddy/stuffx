import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'

class MessageExampleDismissibleBlock extends Component {
  state = { visible: true }

  handleDismiss = () => {
    this.setState({ visible: false })

  }

  render() {
    if (this.state.visible) {
      return (
        <Message
          onDismiss={this.handleDismiss}
          header='Welcome back!'
          content='This is a special notification which you can dismiss.'
        />
      )
    }

    return (
<div />
    )
  }
}

export default MessageExampleDismissibleBlock
