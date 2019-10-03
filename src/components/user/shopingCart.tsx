import React from 'react';
import  '../../style/shopingCart.css';
import { connect } from 'react-redux';
import { getState, countTotalPrice, buttonDelete, buttonAdd, buttonMult, countTotalBooks } from '../../actionsComponents/actUserHome';
import { countBooks } from '../../redux/user/actions';

interface stateShopingCart{
    selectBooksArr: []
}
class shopingCart extends React.Component<any>{
    state:stateShopingCart={
        selectBooksArr: []
    }
    componentDidMount(){
        this.setState({selectBooksArr: getState()})
    }
    render(){
        let selectBooksArr = this.state.selectBooksArr;
        this.props.countBooks(countTotalBooks(selectBooksArr))
        if(selectBooksArr.length !== 0){ 
            return (
                <div className="container-shoping-cart">
                    {selectBooksArr.map((element:any, i:number)=>{
                        return(
                        <div> 
                            <div>{`Название книги: ${element.title}`}</div>
                            <div className="item" key={`${i}qwe`}>
                                <button id={`de${element._id}`} onClick={(e)=>{
                                    buttonDelete(e, selectBooksArr)
                                    this.setState({selectBooksArr: getState()})
                                }}>X</button> 
                                <button id={`pl${element._id}`} onClick={(e)=>{
                                    buttonAdd(e, selectBooksArr)
                                    this.setState({selectBooksArr: getState()})
                                }}>+</button>
                                <img src={element.choosePhoto} alt=""/>
                                <button id={`mn${element._id}`} onClick={(e)=>{
                                    buttonMult(e, selectBooksArr)
                                    this.setState({selectBooksArr: getState()})
                                }}>-</button>
                                <span>{`Колличество: ${element.totalCount} шт.`}</span>
                                <span>{`Цена: ${parseInt(element.price) * element.totalCount} грн.`}</span>
                            </div>
                        </div>
                        )
                    })}
                    <p>{`Общая стоимость: ${countTotalPrice(selectBooksArr)} грн.`}</p>
                </div>
            )
        }else{
            return (<h1>Ничего не выбранно!</h1>)
        }
    }
}

const mapStateToProps = (state: any) => ({
    selectBook: state.userBooks.selectBook,
    arrayBookInCart: state.userBooks.arrayBookInCart 
});

export default connect(
    mapStateToProps,
    { countBooks }
)(shopingCart);