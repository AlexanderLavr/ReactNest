import React from 'react';
import { connect } from 'react-redux';



class viewBook extends React.Component<any>{
    render(){
        if(this.props.selectBook.title){
            return(
                <div style={{display: 'flex', width: '100%'}}>
                    <div style={{width: '40%', display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                        <img src={this.props.selectBook.choosePhoto} alt=""/>
                    </div>
                    <div>
                        <h1 style={{textAlign: 'left'}}>{this.props.selectBook.title}</h1>
                        <p>{this.props.selectBook.description}</p>
                        <p style={{textAlign: 'left'}}>{`Колличество: ${this.props.selectBook.amount} шт.`}</p>
                        <p style={{textAlign: 'left'}}>{`Цена: ${this.props.selectBook.price}`}</p>
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