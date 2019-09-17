import { LoginProc } from './actions';
import { HeaderProc }from '../header/actions';

interface loginInitialState{
  loginEmail: string,
  logErrorEmail: string,
  logErrorPassword: string,
  loginError: string,
  imageProfile: string,
  loginSuccess: boolean,
  doLogin: boolean,
  userIsAdmin: boolean,
  idUser: number
}

const initialState:loginInitialState = {
  doLogin: false,
  loginEmail: '',
  logErrorEmail: '',
  logErrorPassword: '',
  loginSuccess: false,
  loginError: '',
  imageProfile: '',
  idUser: 0,
  userIsAdmin: false
};

export function loginReducer(state:loginInitialState = initialState, action:any){
    switch (action.type){
      case LoginProc.DO_LOGIN:
        return {
          ...state, 
          doLogin: true
        }
      case LoginProc.ERROR_VALIDE:
        let obj = action.errorObj
        return {
          ...state, 
          loginError: '',
          logErrorEmail: obj.logErrorEmail,
          logErrorPassword: obj.logErrorPassword
        }
      case LoginProc.LOGIN_SUCCESS_USER:
        let objSuccUser = action.decoded;

        return {
          ...state, 
          loginSuccess: true,
          loginEmail: objSuccUser.email,
          userIsAdmin: objSuccUser.isAdmin,
          imageProfile: objSuccUser.imageProfile,//take this with json-server
          idUser: objSuccUser.id//take this with json-server 
        }
      case LoginProc.LOGIN_SUCCESS_ADMIN:
        let objSuccAdmin = action.decoded; 
        return {
          ...state, 
          loginSuccess: true,
          loginEmail: objSuccAdmin.email,
          userIsAdmin: objSuccAdmin.isAdmin,
          imageProfile: objSuccAdmin.imageProfile,//take this with json-server
          idUser: objSuccAdmin.id//take this with json-server
        }
      case LoginProc.LOGIN_ERROR:
          return {
            ...state, 
            loginError: action.error,
            logErrorEmail: '',
            logErrorPassword: ''
          }
      case HeaderProc.SAVE_PHOTO:
        return {
          ...state, 
          imageProfile: action.saveImg
        }
      case HeaderProc.HEADER_LOCAL_STORE://from Local STORE
        return {
          ...state, 
          loginSuccess: action.obj.obj.loginSuccess,
          loginEmail: action.obj.obj.email,
          userIsAdmin: action.obj.obj.admin,
          imageProfile: action.obj.obj.imageProfile,
          idUser: action.obj.obj.idUser
        }
      case LoginProc.SUCCESS_REGISTER_TEXT:
          return {
            ...state,
            loginError: action.error
          }
      case HeaderProc.LOG_OUT:
          return {
            ...state, 
            doLogin: false,
            loginEmail: '',
            loginPassword: '',
            loginSuccess: false,
            loginError: '',
            userIsAdmin: false
          }
        default:
          return{...state}
    }
}