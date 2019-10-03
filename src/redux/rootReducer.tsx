import { regestrationReducer } from './regestration/reducer';
import { loginReducer } from './login/reducer';
import { adminReducer } from './admin/adminReducer';
import { adminBooksReducer } from './admin/adminBooks/adminBooksReducer';
import { userReducer } from './user/userReducer';
import { Reducer, combineReducers } from 'redux';


  

const rootReducer: Reducer = combineReducers<any>({
    regestration: regestrationReducer,
    login: loginReducer,
    admin: adminReducer, 
    adminBooks: adminBooksReducer,
    userBooks: userReducer
});
export default rootReducer;   