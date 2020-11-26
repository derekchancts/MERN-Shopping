import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import axios from 'axios';


export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then(res => 
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
  // return {
  //   type: GET_ITEMS
  // }
};



export const deleteItem = (id) => dispatch => {
  axios 
    .delete(`/api/items/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    })
};



export const addItem = (newData) => dispatch => {
  axios
    .post('/api/items', newData)
    .then(res => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    })
};



export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}