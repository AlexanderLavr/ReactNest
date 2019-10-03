import { regestrationReducer } from './registration/reducer.registration';
import { loginReducer } from './login/reducer.login';
import { adminReducer } from './admin/reducer.admin';
import { adminBooksReducer } from './admin/admin.books/reducer.admin.book';
import { userReducer } from './user/reducer.user';
import { Reducer, combineReducers } from 'redux';


  

const rootReducer: Reducer = combineReducers<any>({
    regestration: regestrationReducer,
    login: loginReducer,
    admin: adminReducer, 
    adminBooks: adminBooksReducer,
    userBooks: userReducer
});
export default rootReducer;   