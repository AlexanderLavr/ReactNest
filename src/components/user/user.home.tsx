import React from 'react';
import './user.home.css';
import MediaCard from './user.carts';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
// import { UserHome } from '../containers/user/user.home';
import { queryServer } from '../../redux/user/actions.user';


export class UserHome extends React.Component<any>{
    render(){
        let redirect:any = localStorage.getItem('isAdmin');
        switch(redirect){
        case null:
            return <Redirect to='/' />
        case 'true':
            return <Redirect to='/adminHome' />
        }
        if(Object.keys(this.props.serverBooks).length !== 0){
            return ( 
            <div className="container-user-home">
                {this.props.serverBooks.map((elem:any, i:number)=>{
                    return <MediaCard
                        key={i}
                        id={elem._id}
                        title={elem.title}
                        image={elem.choosePhoto}
                        description={elem.description}
                    />
                })}
            </div>)
        }else{
            return(
                <div className="container-loader">
                    <CircularProgress style={{width: '100px'}} />
                </div>
            )
        }
    }
    componentDidMount(){
        this.props.queryServer()
    }
}





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