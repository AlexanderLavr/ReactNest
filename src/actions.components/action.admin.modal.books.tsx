import { connect } from 'react-redux';
import { AdminModalBooks } from '../components/admin/admin.books/modal.books';
import { closeModalAddBooks, saveNewBook, editBook} from '../redux/admin/admin.books/actions.admin.book';

const mapStateToProps = (state: any):{} => ({  
    openAdminModalBooks: state.adminBooks.openAdminModalBooks,
    labelOfModal: state.adminBooks.labelOfModal,
    title: state.adminBooks.title,
    price: state.adminBooks.price,
    description: state.adminBooks.description,
    amount: state.adminBooks.amount,
    choosePhoto: state.adminBooks.choosePhoto,
    idBooks: state.adminBooks.idBooks
  });
  
export default connect(
    mapStateToProps,
    { closeModalAddBooks, saveNewBook, editBook}
  )(AdminModalBooks);

