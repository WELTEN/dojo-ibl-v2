import React, { Component } from 'react';
import { Modal, Dialog, Body, InputGroup, Button } from 'react-bootstrap';

class EditActivity extends React.Component {

  state = {
    show: false
  };

  render() {
    return (
      <Modal.Dialog
      show={this.state.show}
      onHide={this.hideModal}>
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          One fine body...
        </Modal.Body>

        <Modal.Footer>
          <Button>Close</Button>
          <Button bsStyle="primary">Save changes</Button>
        </Modal.Footer>

      </Modal.Dialog>
    )
  }
}

export default EditActivity
