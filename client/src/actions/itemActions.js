import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';



export const getItems = () => dispatch => {
  // dispatch(setItemsLoading());
  dispatch({ type: ITEMS_LOADING });
  axios
    .get('/api/items')
    .then(res => 
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      }))
      .catch(err => dispatch(
        returnErrors(err.response.data, err.response.status
      )))  
    
  // return {
  //   type: GET_ITEMS
  // }
};



export const deleteItem = (id) => (dispatch, getState) => {
  axios 
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(() => dispatch({
        type: DELETE_ITEM,
        payload: id
      }))
    .catch(err => dispatch(
      returnErrors(err.response.data, err.response.status
    ))) 
};



export const addItem = (newData) => (dispatch, getState) => {
  axios
    .post('/api/items', newData, tokenConfig(getState))
    .then(res => dispatch({
        type: ADD_ITEM,
        payload: res.data
      }))
    .catch(err => dispatch(
      returnErrors(err.response.data, err.response.status
    )))  
};



// export const setItemsLoading = () => {
//   return {
//     type: ITEMS_LOADING
//   }
// }