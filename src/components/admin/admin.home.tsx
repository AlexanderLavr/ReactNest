import React from 'react';
import SimpleTabs from './tabs.admin.home';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { queryServer } from '../../redux/admin/actions.admin';


class AdminHome extends React.Component<any>{
  componentDidMount(){
    this.props.queryServer()
  }
  render(){
    let redirect:any = localStorage.getItem('isAdmin');
    switch(redirect){
      case null:
        return <Redirect to='/' />
      case 'false':
        return <Redirect to='/userHome' />
    }
    return(
      <SimpleTabs></SimpleTabs>
    )
  }
}

const mapStateToProps = (state: any):{} => ({
    loginSuc: state.login.loginSuccess,
    loginEmail: state.login.loginEmail,
    loginPassword: state.login.loginPassword,
    userIsAdmin: state.login.userIsAdmin,
    imageProfile: state.login.imageProfile,
    serverArray: state.admin.serverArray,
    openAdminModal: state.admin.openAdminModal,
    editUserServer: state.admin.editUserServer
});

export default connect(
    mapStateToProps,
    { queryServer }
)(AdminHome);
