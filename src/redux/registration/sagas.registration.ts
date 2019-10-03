import { call, put, takeEvery } from 'redux-saga/effects';
import { RPr } from './actions.registration';
import { LoginProc } from '../login/actions.login';
import { request } from '../../help/request';

interface RegisterObj {
    email: string,
    firstname: string,
    isAdmin: boolean,
    password: string,
    secondname: string,
    imageProfile?: string
}

export function* doRegistration(): IterableIterator<any>{
    yield takeEvery(RPr.DO_REGISTER, function*(obj:any){
        let mainObj:RegisterObj = obj.obj;
        let response = yield call(request, 'users/register', 'POST', mainObj)
        
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

   