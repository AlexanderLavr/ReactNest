import { put, takeEvery, call} from 'redux-saga/effects';
import { request } from '../../help/request';
import { AdminProc } from './actionsAdmin';
import { AdminBooksProc } from '../../redux/admin/adminBooks/actions';
    


export function* doAdmin(): IterableIterator<any>{
    yield takeEvery(AdminProc.DO_ADMIN, function*(){
        // get default array users
        let defaultArray = yield call(request, 'http://localhost:4200/users', 'GET')
        if(defaultArray.success){
            let data:[] = defaultArray.data
            yield put({type: AdminProc.ADMIN_ARRAY, data})
        }
        // get default array books
        let defaultArrayBooks = yield call(request, 'http://localhost:4200/books', 'GET');
        let data:[] = defaultArrayBooks;
        yield put({type: AdminBooksProc.APDATE_ARRAY_BOOKS, data})
    })

    yield takeEvery(AdminProc.DO_DELETE_USER, function*(id:any){//delete users
        let dataUser:any = id.id;
        let deleteUser = yield call(request, `http://localhost:4200/users/${dataUser}`, 'DELETE');
        if(deleteUser.success){
            let defaultArray = yield call(request, 'http://localhost:4200/users', 'GET')
            let data:[] = defaultArray.data
            yield put({type: AdminProc.ADMIN_ARRAY, data})
        }else{
            alert('Error on the server, try again later!')
        }
  
    })

    yield takeEvery(AdminProc.DO_EDIT_USER, function*(id:any){//edit user
        let editUserId:any = id.id;
        let response = yield call(request, `http://localhost:4200/users/${editUserId}`, 'GET')  
        if(response.success){
            response.data.id = String(response.data.id)
            let data = response.data;
            yield put({type: AdminProc.EDIT_USER_SERVER,  data})
        }else{
            alert('Error on the server, try again later!')
        }
    })

    yield takeEvery(AdminProc.DO_SAVE_EDIT_USER, function*(data:any){//edit users in modal
        let editUserBody:any = data.data;
        let id = editUserBody.id;
        let response = yield call(request, `http://localhost:4200/users/${id}`, 'PUT', editUserBody)
        if(response.success){
            let defaultArray = yield call(request, 'http://localhost:4200/users', 'GET')
            let updateUserArray:[] = defaultArray.data
            let newEditUser = response.data;
            yield put({type: AdminProc.UPDATE_USER, updateUserArray, newEditUser})
        }else{
            alert('Error on the server, try again later!')
        } 
    })
}