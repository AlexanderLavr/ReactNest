import React from 'react';
import '../../../style/modal.admin.css'
import Modal from '@material-ui/core/Modal';

interface AdminModalState {
  id: number,
  firstname: string,
  secondname: string,
  email: string
}

export class AdminModal extends React.Component<any,any>{
  state:AdminModalState = {
    id: this.props.editUserServer.id,
    firstname: this.props.editUserServer.firstname,
    secondname: this.props.editUserServer.secondname,
    email: this.props.editUserServer.email
}   
  
  changeInp=(e:any)=>{
    this.setState({[e.target.placeholder]:e.target.value})
  }
 
  render(){ 
    return(
      <Modal open={this.props.openAdminModal} className="modal-admin">
        <div  className="modal-container">
          <h2 id="simple-modal-title">Edit User</h2>
          <div>
            <input style={{display: 'none'}}onChange={()=>{}}value={this.state.id} />
            <input placeholder="firstname" onChange={(e)=>{this.changeInp(e)}}  value={this.state.firstname}/>
            <input placeholder="secondname" onChange={(e)=>{this.changeInp(e)}}  value={this.state.secondname}/>
            <input placeholder="email" onChange={(e)=>{this.changeInp(e)}}  value={this.state.email}/>
          </div>
          <button className="save-edit" onClick={()=>{
            this.props.saveEditUser(this.state)
            setTimeout(()=>{this.props.closeModal()}, 500)
            }}>save</button>
          {/* <button className="close-modal" onClick={()=>{this.props.closeModal()}}>close</button> */}
        </div>
      </Modal>
    )
  } 
}

