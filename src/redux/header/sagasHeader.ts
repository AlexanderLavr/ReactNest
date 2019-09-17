import { put, takeEvery} from "redux-saga/effects";
import { HeaderProc } from './actions'

export function* doHeader(): IterableIterator<any>{
    yield takeEvery(HeaderProc.DO_HEADER, function*(obj:any){
        yield put({type: HeaderProc.HEADER_LOCAL_STORE, obj})
        
    })
}
