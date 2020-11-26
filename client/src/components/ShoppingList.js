import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

import { connect } from 'react-redux';
import { getItems, deleteItem, addItem } from '../actions/itemActions';



class ShoppingList extends Component {
  // state = {
  //   items: [
  //     { id: uuidv4(), name: "Eggs"},
  //     { id: uuidv4(), name: "Milk"},
  //     { id: uuidv4(), name: "Bread"},
  //     { id: uuidv4(), name: "Steak"}
  //   ]
  // };

  componentDidMount() {
    this.props.getItems();
  }


  render() {
    // const { items } = this.state;
    const { items } = this.props.item;

    return (
      <Container>
      
        {/*}
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={() => {
            const name = prompt('Enter Item')
            if(name) {
              // this.setState(state => ({
              //   items: [...state.items, { 
              //     id: uuidv4(),
              //     name
              //   }]
              // }))
              let newData = {};
              newData = {
                id: uuidv4(),
                name
              };
              this.props.addItem(newData)
            }
          }}
        >Add Item
        </Button>
        */}

        <ListGroup>
          <TransitionGroup className="shopping-list" >
            {items.map((item) => (
              <CSSTransition key={item._id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    // style={{marginRight: '0.5rem'}}
                    color="danger"
                    size="sm"
                    // onClick={() => {
                    //   this.setState(state => ({
                    //     items: state.items.filter(itemm => itemm.id !== item.id)
                    //   }))
                    // }}
                    onClick={() => this.props.deleteItem(item._id)}
                  >&times;
                  </Button>
                  {item.name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>

      </Container>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  getItems: () => dispatch(getItems()),
  deleteItem: (id) => dispatch(deleteItem(id)),
  addItem: (newData) => dispatch(addItem(newData))
})


const mapStateToProps = (state) => {
  return {
    item: state.item
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);