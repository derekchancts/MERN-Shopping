import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import { v4 as uuidv4 } from 'uuid';


class ItemModal extends Component {
  state = {
    modal: false,
    name: ''
  }


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }


  onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      // id: uuidv4(),
      name: this.state.name
    }

    this.props.addItem(newItem)

    // close modal
    this.toggle();
  }


  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    const { isAuthenticated } = this.props;

    return(
      <div>
      
      { isAuthenticated ? (
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={this.toggle}
        >Add Item
        </Button>
      ) : (
        <h4> Please log in to be able to add new items</h4>
      )}

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input 
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                />
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>

      </div>
    )
  }
  
}


const mapDispatchToProps = (dispatch) => ({
  addItem: (newData) => dispatch(addItem(newData))
})


const mapStateToProps = (state) => {
  return {
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);