import { connect } from 'react-redux';
import { UserHome } from '../components/user/user.home';
import { queryServer } from '../redux/user/actions.user';




export const getMatch = (selectBooksArr:any, id:string):boolean=>{// check on match
    let match:boolean = false;
    for(let element of selectBooksArr){
        if(id === String(element._id)){
            return match = true;
        }
    }
    return match
}
export const matchIs = (selectBooksArr:any, id:string):boolean =>{// add ismatch amount
    let count:boolean = false;
    for(let element of selectBooksArr){
        if(id === String(element._id)){ 
            if(Number(element.amount) !== element.totalCount){
                element.totalCount++
                count = true;
            }
        }
    }
    localStorage.setItem('selectBooks', JSON.stringify(selectBooksArr))
    return count
}

export const countTotalBooks = (arr:any):number =>{
    let totalBooks:number = 0;
    for(let element of arr){
        totalBooks += element.totalCount
    }
    return totalBooks
}

export const countTotalPrice = (arr:any):number =>{
    let totalPrace:number = 0;
    for(let element of arr){
        totalPrace += (element.totalCount * parseInt(element.price))
    }
    return totalPrace
}

export const buttonDelete = (e:any, arr:any):void =>{
    let buttonDelete:HTMLButtonElement = e.target;
    let id:string = buttonDelete.id.substr(2, )
    for(let element of arr){
        if(id ===  String(element._id)){
            let index = arr.indexOf(element);
            arr.splice(index, 1);
        }
    }
    localStorage.setItem('selectBooks', JSON.stringify(arr))
}
export const buttonAdd = (e:any, arr:any):void =>{
    let buttonAdd:HTMLButtonElement = e.target;
    let id:string = buttonAdd.id.substr(2, )
    for(let element of arr){
        if(id === String(element._id)){
            if(element.totalCount === Number(element.amount)){
                localStorage.setItem('selectBooks', JSON.stringify(arr))
            }else{
                element.totalCount++
                localStorage.setItem('selectBooks', JSON.stringify(arr))
            }
        }
    }
} 

export const buttonMult = (e:any, arr:any):void =>{
    let buttonMult:HTMLButtonElement = e.target;
    let id:string = buttonMult.id.substr(2, )
    for(let element of arr){
        if(id ===  String(element._id)){
            if(element.totalCount === 1){
                localStorage.setItem('selectBooks', JSON.stringify(arr))
            }else{
                element.totalCount--
                localStorage.setItem('selectBooks', JSON.stringify(arr))
            }
        }
    }
} 

export const getState = ():[] =>{
    localStorage.getItem(('selectBooks') || '[]')
    let selectBooksArr:[] = JSON.parse(localStorage.getItem('selectBooks') || '[]');
    return selectBooksArr
} 



const mapStateToProps = (state: any):{} => ({
    serverBooks: state.userBooks.serverBooks,
});
export default connect(
    mapStateToProps,
    { queryServer }
)(UserHome);