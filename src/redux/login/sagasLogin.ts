import { put, takeEvery, call} from "redux-saga/effects";
import { request } from '../../help/request';
import { LoginProc } from '../../redux/login/actions';
import jwtDecode from "jwt-decode";
    
export interface loginObj{
    email: string,
    password: string
}

export function* doLogin(): IterableIterator<any>{
    yield takeEvery(LoginProc.DO_LOGIN, function*(obj:any){
        let loginObj:any = obj.obj;
        let response = yield call(request, 'http://localhost:4200/login', 'POST', loginObj);
        if(response.success === false && response.errorValid === true){
            let errorObj = response.data;
            yield put({type: LoginProc.ERROR_VALIDE, errorObj})
            return
        }
        
        if(response.success === false){
            let error = response.message;
            yield put({type: LoginProc.LOGIN_ERROR, error})
        }
        
        if(response.success === true){
            let token:string = response.data;
            let decoded:any = jwtDecode(token)//server OBJ
            if(decoded.isAdmin === 'admin'){
                decoded.isAdmin = true
            }
            if(decoded.isAdmin === 'user'){
                decoded.isAdmin = false
            }
            //-----------------------------//work with local
            const selectBooks:[] = [];//create store for books
            localStorage.setItem('selectBoock', JSON.stringify(selectBooks))
            //-----------------------------//work with local
            if(decoded.isAdmin){//admin
                yield put({type:LoginProc.LOGIN_SUCCESS_ADMIN, decoded});
                localStorage.setItem('isAdmin', JSON.stringify(true))
                localStorage.setItem('user', JSON.stringify({
                    doLogin: true,
                    loginSuccess: true,
                    email: decoded.email,
                    idUser: decoded.id,
                    admin: decoded.isAdmin,
                    imageProfile: decoded.imageProfile
                }))
                arguments[0].history.push('./adminHome');
            }else{//!admin
                yield put({type:LoginProc.LOGIN_SUCCESS_USER, decoded})
                localStorage.setItem('isAdmin', JSON.stringify(false))
                localStorage.setItem('user', JSON.stringify({
                    doLogin: true,
                    loginSuccess: true,
                    email: decoded.email,
                    idUser: decoded.id,
                    admin: decoded.isAdmin,
                    imageProfile: decoded.imageProfile
                }))
                arguments[0].history.push('./userHome');
            }
        }
    })
}
