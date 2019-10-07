import { put, takeEvery, call} from 'redux-saga/effects';
import { request } from '../../help/request';
import { LoginProc } from './actions.login';
import jwtDecode from 'jwt-decode';

    
export interface loginObj{
    email: string,
    password: string
}

export function* doLogin(): IterableIterator<any>{
    yield takeEvery(LoginProc.DO_LOGIN, function*(obj:any){
        let loginObj:any = obj.obj;
        let user = {
            username: loginObj.email,
            password: loginObj.password
        }

        let response = yield call(request, 'login', 'POST', user);

        if(response.error){ 
            let error = response.error;
            yield put({type: LoginProc.LOGIN_ERROR, error})
            return
        }
        if(response.success === false && response.errorValid === true){
            let errorObj = response.data;
            yield put({type: LoginProc.ERROR_VALIDE, errorObj})
            return
        }
        
        if(response.logErrorEmail || response.logErrorPassword){ 
            let errorObj = response;
            yield put({type: LoginProc.ERROR_VALIDE, errorObj})
            return
        }
        
        if(response.success === true){//response.success === true
            let token:string = response.data;
            localStorage.setItem('token', token);
            let decoded:any = jwtDecode(token)//server OBJ
            let userId = decoded.id;
            let profile = yield call(request, `users/avatar/${userId}`, 'GET');
            let imgProfile = profile.data;
            if(decoded.isAdmin === 'admin'){
                decoded.isAdmin = true
            }
            if(decoded.isAdmin === 'user'){
                decoded.isAdmin = false
            }
            //-----------------------------//work with local
            const selectBooks:[] = [];//create store for books
            localStorage.setItem('selectBooks', JSON.stringify(selectBooks))
            //-----------------------------//work with local
            if(decoded.isAdmin){//admin
                yield put({type:LoginProc.LOGIN_SUCCESS_ADMIN, decoded, imgProfile});
                localStorage.setItem('isAdmin', JSON.stringify(true))
                localStorage.setItem('user', JSON.stringify({
                    doLogin: true,
                    loginSuccess: true,
                    email: decoded.email,
                    idUser: decoded.id,
                    admin: decoded.isAdmin,
                    imageProfile: imgProfile
                }))
                arguments[0].history.push('./adminHome');
            }else{//!admin
                yield put({type:LoginProc.LOGIN_SUCCESS_USER, decoded, imgProfile})
                localStorage.setItem('isAdmin', JSON.stringify(false))
                localStorage.setItem('user', JSON.stringify({
                    doLogin: true,
                    loginSuccess: true,
                    email: decoded.email,
                    idUser: decoded.id,
                    admin: decoded.isAdmin,
                    imageProfile: imgProfile
                }))
                arguments[0].history.push('./userHome');
            }
        }
    })
}
