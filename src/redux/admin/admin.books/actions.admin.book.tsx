export enum AdminBooksProc{
    DO_SAVE_BOOK = 'DO_SAVE_BOOK',
    OPEN_MODAL_ADD_BOOKS = 'OPEN_MODAL_ADD_BOOKS',
    CLOSE_MODAL_ADD_BOOKS = 'CLOSE_MODAL_ADD_BOOKS',
    APDATE_ARRAY_BOOKS = 'APDATE_ARRAY_BOOKS',
    DO_EDIT_BOOK = 'DO_EDIT_BOOK',
    CHECK_EDIT_BOOK = 'CHECK_EDIT_BOOK',
    DO_SAVE_EDIT_BOOK = 'DO_SAVE_EDIT_BOOK',
    CHECK_DELET_BOOKS = 'CHECK_DELET_BOOKS',
    DO_DELETE_BOOKS = 'DO_DELETE_BOOKS'
}


export function closeModalAddBooks(){
    return {type: AdminBooksProc.CLOSE_MODAL_ADD_BOOKS};
}
export function saveNewBook(boockState:{}){
    return {type: AdminBooksProc.DO_SAVE_BOOK, boockState};
}
export function editBook(boockState:{}, id:string){
    return {type: AdminBooksProc.DO_SAVE_EDIT_BOOK, boockState, id};
}


//table of book

export function openModaladdBooks(){
    return {type: AdminBooksProc.OPEN_MODAL_ADD_BOOKS};
}
export function setDeleteArrayBook(arrayBooks:any[]){
    return {type: AdminBooksProc.CHECK_DELET_BOOKS, arrayBooks};
}
export function deleteBook(deleteArrayBooks:any[]){
    return {type: AdminBooksProc.DO_DELETE_BOOKS, deleteArrayBooks};
}
export function getEditBook(id:string){
    return {type: AdminBooksProc.DO_EDIT_BOOK, id};
}