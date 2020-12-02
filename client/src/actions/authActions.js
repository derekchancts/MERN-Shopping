import axios from 'axios';
import { returnErrors } from './errorActions';

import { 
  USER_LOADING, 
  USER_LOADED, 
  AUTH_ERROR, 
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';



// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  /*
  // Get token from localstorage (from authReducer)
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }

  // If token, add to headers
  if(token) {
    config.headers['x-auth-token'] = token;
  }
  */

  // Fetch user
  // axios.get('/api/users/user', config)
  axios.get('/api/users/user', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: AUTH_ERROR
      })
    })
};



// Login user
export const login = ({ email, password }) => dispatch => {

  dispatch({ type: USER_LOADING });


  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password });

  axios.post('/api/users/login', body, config)
    .then(res => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data.msg, err.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: LOGIN_FAIL,
      })
    })
}
 



// Logout user
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_SUCCESS })
}
// export const logout = () => {
//   console.log("logging out")
//   return {
//     type: LOGOUT_SUCCESS
//   };
// }
 


 
// Register User
export const register = ({ name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Create Request body / data
  // JSON.stringify - we will be takig a Javascript object and then turns it to a JSON
  const body = JSON.stringify({ name, email, password });

  axios.post('/api/users/register', body, config)
    .then(res => dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data.msg, err.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: REGISTER_FAIL,
      })
    })
};



// Setup config/headers and token
export const tokenConfig = (getState) => {
   // Get token from localstorage (from authReducer)
   const token = getState().auth.token;

   // Headers
   const config = {
     headers: {
       "Content-Type": "application/json"
     }
   }
 
   // If token, add to headers
   if(token) {
     config.headers['x-auth-token'] = token;
   }

   return config;
};