const initialState = {
  modalOpen: false,
}


export const openModal = () => ({
  type: 'OPEN_MODAL',
})
export const closeModal = () => ({
  type: 'CLOSE_MODAL',
})


export default (state = initialState, action) => {
  switch (action.type) {

  case 'OPEN_MODAL':
    return { ...state, modalOpen: true }
  case 'CLOSE_MODAL':
    return { ...state, modalOpen: false }

  default:
    return state
  }
}

{/* <Modal
trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
open={this.state.modalOpen}
onClose={this.handleClose}
basic
size='small'
>
<Header icon='browser' content='Cookies policy' />
<Modal.Content>
  <h3>This website uses cookies to ensure the best user experience.</h3>
</Modal.Content>
<Modal.Actions>
  <Button color='green' onClick={this.handleClose} inverted>
    <Icon name='checkmark' /> Got it
  </Button>
</Modal.Actions>
</Modal> */}