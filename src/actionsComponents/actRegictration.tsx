import { RegistrationComponent } from '../components/regestration';
import { connect } from 'react-redux';
import { doRegister } from '../redux/regestration/actions';


export const mapStateToProps = (state: any):{}=> ({
    email: state.regestration.email,
    firstname: state.regestration.firstname,
    secondname: state.regestration.secondname,
    password: state.regestration.password,
    errorFirstname: state.regestration.errorFirstname,
    errorSecondname: state.regestration.errorSecondname,
    errorEmail: state.regestration.errorEmail,
    errorPassword: state.regestration.errorPassword,
    successRegister: state.regestration.successRegister,
    error: state.regestration.error
});

export default connect(
    mapStateToProps,
    { doRegister }
)(RegistrationComponent);