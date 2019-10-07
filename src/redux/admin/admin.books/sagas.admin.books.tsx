import { put, takeEvery, call} from 'redux-saga/effects';
import { request } from '../../../help/request';
import { AdminBooksProc } from './actions.admin.book';

 


export function* doAdminBooks(): IterableIterator<any>{

    yield takeEvery(AdminBooksProc.DO_SAVE_BOOK, function*(boockState:any){
        let bookObjSave:{} = boockState.boockState;
        let saveBook = yield call(request, 'books', 'POST', bookObjSave);      
        if(saveBook.success){
            let defaultArrayBooks = yield call(request, 'books', 'GET')
            let data:[] = defaultArrayBooks;
            yield put({type: AdminBooksProc.APDATE_ARRAY_BOOKS, data})
        }else{ 
            alert('Server problems!')
        }
    })

    yield takeEvery(AdminBooksProc.DO_DELETE_BOOKS, function*(arrDelBooks:any){
        let arrayDelBooks:string[] = arrDelBooks.deleteArrayBooks;
        let deleteBoks =  yield call(request, 'books/deleteBooks', 'DELETE', arrayDelBooks);
        if(deleteBoks.success){
            let defaultArrayBooks = yield call(request, 'books', 'GET')
            let data:[] = defaultArrayBooks;
            yield put({type: AdminBooksProc.APDATE_ARRAY_BOOKS, data})
        }else{ 
            alert('Server problems!')
        }
    })



    yield takeEvery(AdminBooksProc.DO_EDIT_BOOK, function*(id:any){
        let editBookId:string = id.id; 
        let takeEditBook = yield call(request, `books/takeEditBook/${editBookId}`, 'GET');
        if(takeEditBook.success){
            let editBook:{} = takeEditBook.data;
            yield put({type: AdminBooksProc.CHECK_EDIT_BOOK, editBook})
        }else{ 
            alert('Server problems!')
        }
    })


    yield takeEvery(AdminBooksProc.DO_SAVE_EDIT_BOOK, function*(editBook:any){
        let idEditBook:string = editBook.id;
        let stateEditBook:{} = editBook.boockState;
    
        let savEditBook = yield call(request, `books/${idEditBook}`, 'PUT', stateEditBook);
        if(savEditBook.success){
            let defaultArrayBooks = yield call(request, 'books', 'GET')
            let data:[] = defaultArrayBooks;
            yield put({type: AdminBooksProc.APDATE_ARRAY_BOOKS, data})
        }else{ 
            alert('Server problems!')
        }
    })
}