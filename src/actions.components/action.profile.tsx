import { connect } from 'react-redux';
import { Profile } from '../components/profile';
import { saveImgProfile } from '../redux/header/actions.header';



export const mapStateToProps = (state: any):{} => ({
    email: state.login.email,
    password: state.password,
    imageProfile: state.login.imageProfile,
    idUser: state.login.idUser
});


export default connect(
    mapStateToProps,
    { saveImgProfile }
)(Profile);