import React from 'react';
import { Redirect } from 'react-router-dom';

interface LoginState {
    email: string,
    password: string
}

export class Login extends React.Component<any>{
    state:LoginState = {
        email: this.props.emailUser,
        password: this.props.passwordUser
    }
    

    changeInp = (e:any):void =>{
        this.setState({[e.target.name]:e.target.value})
    }

    eventLogin(e:any){
        e.preventDefault();
        let {history} = this.props;
        this.props.doLogin(this.state, history)
    }

    render(){
        let redirect:any = localStorage.getItem('isAdmin');
        switch(redirect){
        case 'false':
            return <Redirect to='/userHome' />
        case 'true':
            return <Redirect to='/adminHome' /> 
        }
        return(
            <div className="container-login">
                <h2>LogIn</h2>
                <div className="conteiner-form">
                    <form>
                    <div className="item-email">
                        <div className="email-left">Email:</div>
                            <div className="email-right">
                                <input  type="email" name="email"  onChange={this.changeInp} value={this.state.email}/>
                            </div>
                        </div>
                        <div className="error">{this.props.logErrorEmail}</div>
                        <div className="item-password">
                            <div className="password-left">Password:</div>
                            <div className="password-right">
                                <input type="password" name="password" onChange={this.changeInp} value={this.state.password}/>
                            </div>
                        </div>
                        <div className="error">{this.props.logErrorPassword}</div>
                        <div className="item-button">
                            <button  id="submit-registr" onClick={(e)=>{this.eventLogin(e)}}>LogIn</button>
                        </div>
                    </form>
                    <div style={{color: 'red', height: '20px'}}>{this.props.loginError}</div>
                </div>
            </div>    
        )
    }
}
