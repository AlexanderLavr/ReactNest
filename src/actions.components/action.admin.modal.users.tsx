import { connect } from 'react-redux';
import { AdminModal } from '../components/admin/admin.users/modal.users';
import { closeModal, saveEditUser } from '../redux/admin/actions.admin';

const mapStateToProps = (state: any) => ({
    serverArray: state.admin.serverArray,
    openAdminModal: state.admin.openAdminModal,
    editUserServer: state.admin.editUserServer
  });
  
  export default connect(
    mapStateToProps,
    { closeModal, saveEditUser }
  )(AdminModal);