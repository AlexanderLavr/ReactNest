import React from 'react';
import '../../style/viewBook.css';
import { connect } from 'react-redux';



class viewBook extends React.Component<any>{
    render(){
        if(this.props.selectBook.title){
            return(
                <div className="container-view-book">
                    <div className="left-content">
                        <img src={this.props.selectBook.choosePhoto} alt=""/>
                    </div>
                    <div className="right-content">
                        <h1>{this.props.selectBook.title}</h1>
                        <p>{this.props.selectBook.description}</p>
                        <p className="item-information">{`Колличество: ${this.props.selectBook.amount} шт.`}</p>
                        <p className="item-information">{`Цена: ${this.props.selectBook.price}`}</p>
                    </div>
                </div>
            )
        }else{
            return (<div></div>)
        }
    }
}

const mapStateToProps = (state:any) => ({
    selectBook: state.userBooks.selectBook
});
export default connect(mapStateToProps)(viewBook); 