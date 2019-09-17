import { call, put, takeEvery, delay } from 'redux-saga/effects';
import { RPr } from '../../redux/regestration/actions';
import { LoginProc } from '../../redux/login/actions';
import { request } from '../../help/request';

interface RegisterObj {
    email: string,
    firstname: string,
    imageProfile: string,
    isAdmin: boolean,
    password: string,
    secondname: string
}

export function* doRegistration(): IterableIterator<any>{
    yield takeEvery(RPr.DO_REGISTER, function*(obj:any){
        let mainObj:RegisterObj = obj.obj;
        let response = yield call(request, 'http://localhost:4200/users/register', 'POST', mainObj)
        // debugger;
        if(response.success){
            yield put({type:RPr.ADD_USER, obj})
            yield put({type:LoginProc.SUCCESS_REGISTER_TEXT, error: response.message})
            arguments[0].history.push('./login')
        }
        if(response.success === false && response.errorValid === false){
            yield put({type:RPr.USER_EXSIST, error: response.message})
        }
        if(response.success === false && response.errorValid === true){
            yield put({type: RPr.ERROR_VALIDE_REGISTRATION, error: response.data})
        }
    })
}

   