import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { doLogin } from '../redux/login/actions.login';

interface LoginState {
    email: string,
    password: string
}

class Login extends React.Component<any>{
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

 
const mapStateToProps = (state: any) => ({
    emailUser: state.regestration.email,
    passwordUser: state.regestration.password,

    imageProfile: state.regestration.imageProfile,
    logErrorEmail: state.login.logErrorEmail,
    logErrorPassword: state.login.logErrorPassword,
    
    loginEmail: state.login.loginEmail,
    loginPassword: state.login.loginPassword,
    loginSuccess: state.login.loginSuccess,
    loginError: state.login.loginError,
    userIsAdmin: state.login.userIsAdmin
});

export default connect(
    mapStateToProps,
    { doLogin }
)(Login);