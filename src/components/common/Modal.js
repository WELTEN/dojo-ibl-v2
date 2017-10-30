import React from 'react';

class ModalConfirmation extends React.Component {

    render() {

      const contentStyle = {
        flex: this.props.size
      };

      return (
        <div className="static-modal">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {this.props.children}
            </Modal.Body>

            <Modal.Footer>
              <Button>{this.props.buttonCancel}</Button>
              <Button bsStyle="primary">{this.props.buttonOk}</Button>
            </Modal.Footer>

          </Modal.Dialog>
        </div>
      )
    }
}

export default ModalConfirmation
