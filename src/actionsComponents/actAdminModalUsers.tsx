import { connect } from 'react-redux';
import { AdminModal } from '../components/admin/adminUsers/modalUsers';
import { closeModal, saveEditUser } from '../redux/admin/actionsAdmin';

const mapStateToProps = (state: any) => ({
    serverArray: state.admin.serverArray,
    openAdminModal: state.admin.openAdminModal,
    editUserServer: state.admin.editUserServer
  });
  
  export default connect(
    mapStateToProps,
    { closeModal, saveEditUser }
  )(AdminModal);