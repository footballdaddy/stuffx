import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
// const inlineStyle = {
//   modal : {
//     marginTop: '0px !important',
//     marginLeft: 'auto',
//     marginRight: 'auto'
//   }
// };


export default class ModalExampleControlled extends Component {
  render() {
    const {closeModal} = this.props;
    return (
      <Modal
        open={this.props.modal.modalOpen}
        onClose={closeModal}
        size='Large'
      >    <Header icon='archive' content='Archive Old Messages' />
    <Modal.Content>
      <p>
        Your inbox is getting full, would you like us to enable automatic archiving of old messages?
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button color='red'>
        <Icon name='remove' /> No
      </Button>
      <Button color='green'>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>

    )
  }
}

