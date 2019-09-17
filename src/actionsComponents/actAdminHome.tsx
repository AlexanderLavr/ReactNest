import { AdminHome } from '../components/admin/adminHome';
import { connect } from 'react-redux';
import { queryServer } from '../redux/admin/actionsAdmin';


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