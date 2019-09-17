export enum UserProc{
    DO_USER = 'DO_USER',
    ARRAY_BOOKS = 'ARRAY_BOOKS',
    START_ADD_BOOK_TO_CART = 'START_ADD_BOOK_TO_CART',
    SELECT_BOOK = 'SELECT_BOOK',
    CHOOSED_BOOK = 'CHOOSED_BOOK',
    ADD_BOOK = 'ADD_BOOK',
    ADD_BOOK_TO_CART = 'ADD_BOOK_TO_CART'
}


export function queryServer(){
    return {type: UserProc.DO_USER};
}

// shoping cart
export function countBooks(countBooksInCart:number){
    return {type: UserProc.START_ADD_BOOK_TO_CART, countBooksInCart};
}

//user carts
export function selBook(id:string){
    return {type: UserProc.SELECT_BOOK, id};
}
export function addBooks(id:string){
    return {type: UserProc.ADD_BOOK, id};
}