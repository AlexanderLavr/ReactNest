import { AdminBooksProc } from './actions';

export const initialState: any = {
    openAdminModalBooks: false,
    arrayBooks: [],
    checkDeleteBooks: [],

    labelOfModal: 'Add Book',
    title: '',
    price: '',
    description: '',
    amount: '',
    choosePhoto: '',
    idBooks: null
    
  };
  
  export function adminBooksReducer(state:any = initialState, action:any){
      switch (action.type){
        case AdminBooksProc.APDATE_ARRAY_BOOKS:
            return {
            ...state,
            arrayBooks: action.data
        }
        case AdminBooksProc.OPEN_MODAL_ADD_BOOKS:
          return {
            ...state,
            openAdminModalBooks: true
        }
        case AdminBooksProc.CLOSE_MODAL_ADD_BOOKS:
            return {
            ...state,
            openAdminModalBooks: false,
            labelOfModal: 'Add Book',
            title: '',
            price: '',
            description: '',
            amount: '',
            choosePhoto: ''
        }
        case AdminBooksProc.CHECK_DELET_BOOKS: 
            return {
            ...state,
            checkDeleteBooks: action.arrayBooks
        }
        case AdminBooksProc.CHECK_EDIT_BOOK:
            return {
            ...state,
            labelOfModal: 'Edit Book',
            title: action.editBook.title,
            price: action.editBook.price,
            description: action.editBook.description,
            amount: action.editBook.amount,
            choosePhoto: action.editBook.choosePhoto,
            openAdminModalBooks: true,
            idBooks: action.editBook._id
        }
        default:
        return{...state}
    }
}
