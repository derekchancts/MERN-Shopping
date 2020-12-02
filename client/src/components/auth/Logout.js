import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';



export class Logout extends Component {
  render() {
    return (
      <div>
        <NavLink onClick={this.props.logout} href="#">
          Logout
        </NavLink>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})


export default connect(null, mapDispatchToProps)(Logout)
