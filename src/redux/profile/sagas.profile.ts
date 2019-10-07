import { put, takeEvery, call} from "redux-saga/effects";
import { request } from '../../help/request';
import { HeaderProc } from '../header/actions.header';
import axios from 'axios';

export function* saveImage(): IterableIterator<any>{
    yield takeEvery(HeaderProc.DO_SAVE_PHOTO, function*(saveImg:any){
        let idUser:string = saveImg.saveImg.id;
        let imageProfile = {
            imageProfile: saveImg.saveImg.img
        }
     
        let response = yield call(request, `users/avatar/${idUser}`, 'PUT', imageProfile)
        if(response.success){
            let saveImg:string = response.data;
            yield put({type: HeaderProc.SAVE_PHOTO, saveImg})
            let localStoreObj:any = localStorage.getItem('user');
            localStoreObj = JSON.parse(localStoreObj)
            localStoreObj.imageProfile = saveImg;
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(localStoreObj))
        }
    })
}
 
   
