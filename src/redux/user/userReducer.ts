import { UserProc } from './actions';

interface UserState {
  countBook:number,
  serverBooks:{},
  selectBook:{}
}

export const initialState:UserState = {
  countBook: 0,
  serverBooks: {},
  selectBook:{}
};

export function userReducer(state = initialState, action:any){
  switch (action.type){
    case UserProc.ARRAY_BOOKS:
      return {
        ...state,
        serverBooks: action.dataBooks
      }
    case UserProc.CHOOSED_BOOK:
      return {
        ...state, 
        selectBook: action.selectBook
      }

    case UserProc.START_ADD_BOOK_TO_CART:
        return { 
          ...state,
          countBook: action.countBooksInCart
        }
    case UserProc.ADD_BOOK_TO_CART:
      return { 
        ...state,
        countBook: state.countBook + 1
      }
    default:
      return{...state}
  }
}