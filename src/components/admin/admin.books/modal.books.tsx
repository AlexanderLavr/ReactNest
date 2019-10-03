import React from 'react';
import '../../../style/modal.admin-add.books.css';
import Modal from '@material-ui/core/Modal';

interface AdminModalBooksState {
    title: string,
    price: string,
    description: string,
    amount: string,
    choosePhoto: string
}
let defaultBook:string  = 'images/defaultBook.jpg';

export class AdminModalBooks extends React.Component<any,any>{
    state:AdminModalBooksState = {
        title: this.props.title,
        price: this.props.price,
        description: this.props.description,
        amount: this.props.amount,
        choosePhoto: defaultBook
    }   
  
    valueChangePhoto(e:any){
        let img:any = document.querySelector('#ptotoOfBook');
        const toBase64 = (file:any) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
        async function Main(){
            const file:any = e.target.files[0];
            if(!file){
                debugger;
                return await toBase64(defaultBook)
            }
            return await toBase64(file)
        }
        Main().then(res =>{
            this.setState({choosePhoto: res})
            img.src = res;
        })
    }
    changeInp=(e:any)=>{
        this.setState({[e.target.placeholder]:e.target.value})
    }
    changeTextArea=(e:any)=>{
        this.setState({description: e.currentTarget.children[0].value})
    }
    render(){    
        return(
            <Modal open={this.props.openAdminModalBooks} className="modal-adminAddBoks">
                <div  className="modal-container">
                <h2 id="simple-modal-title">{this.props.labelOfModal}</h2>
                <div>
                    <div className="holder-inputs">
                        <input placeholder="title" onChange={(e)=>{this.changeInp(e)}} value={this.state.title} required /> 
                        <input placeholder="price" onChange={(e)=>{this.changeInp(e)}}  value={this.state.price} required/>
                        <input placeholder="amount" onChange={(e)=>{this.changeInp(e)}}  value={this.state.amount} required/>
                    </div>
                    <div className="holder-choose-bookPhoto">
                        <input type="file" onChange={(e)=>{this.valueChangePhoto(e)}}/>
                        <img src={this.props.choosePhoto} id="ptotoOfBook" alt=""/>
                    </div>
                    <div className="holder-descriptions" onChange={(e)=>{this.changeTextArea(e)}}>
                        <textarea defaultValue={this.state.description} ></textarea>
                    </div>   
                </div>
                <button className="save-edit" onClick={()=>{
                    if(this.props.labelOfModal === 'Add Book'){
                        if(
                            this.state.title === '' &&
                            this.state.price === '' &&
                            this.state.description === '' &&
                            this.state.amount === '' 
                        ){
                            return alert('Все поля должны быть заполненны!')
                        }
                        setTimeout(()=>{this.props.closeModalAddBooks()}, 500)
                        return this.props.saveNewBook(this.state)
                    }else{
                        setTimeout(()=>{this.props.closeModalAddBooks()}, 500)
                        return this.props.editBook(this.state, this.props.idBooks)
                    }}}>save</button>
                <button className="close-modal" onClick={()=>{this.props.closeModalAddBooks()}}>close</button>
                </div>
            </Modal>
        )
    }   
}
