import { connect } from 'react-redux';
import { Login } from '../components/login';
import { doLogin } from '../redux/login/actions';

 
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