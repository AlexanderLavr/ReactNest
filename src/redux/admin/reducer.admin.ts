import { AdminProc } from './actions.admin';


export const initialState: any = {
  serverArray: [],
  editUserServer: {},
  openAdminModal: false
};

export function adminReducer(state:any = initialState, action:any){
    switch (action.type){

      case AdminProc.ADMIN_ARRAY:
        return {
          ...state, 
        serverArray: action.data
        }
      case AdminProc.EDIT_USER_SERVER:
        return {
          ...state, 
          editUserServer: action.data,
          openAdminModal: true
        }

      case AdminProc.CLOSE_MODAL:
        return {
          ...state, 
          openAdminModal: false,
          editUserServer: {}
        }

      case AdminProc.UPDATE_USER:
        return {
          ...state, 
          serverArray: action.updateUserArray,
          editUserServer: action.newEditUser
        }
      default:
        return{...state}
    }
}