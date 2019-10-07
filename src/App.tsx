import React from 'react';
import '../src/style/app.css';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import HeaderNav from './components/header';
import Login from './components/login';
import Main from './components/main';
import Regestration from './components/registration';
import UserHome from './components/user/user.home';
import AdminHome from './components/admin/admin.home';
import Profile from './components/profile';
import viewBook from './components/user/view.book/view.book';
import shopingCart from './components/user/shoping.cart/shoping.cart';


const store:any = configureStore();
  
const App: React.FC = () => {
  return (
    <Provider store={store}>  
      <Router>
        <Route component={HeaderNav} /> 
        <Route exact path="/" component={Main} /> 
        <Route path="/login" component={Login} /> 
        <Route path="/regestration" component={Regestration} />
        <Route path="/userHome" component={UserHome} />
        <Route path="/adminHome" component={AdminHome} />
        <Route path="/profile" component={Profile} />
        <Route path="/shopingCart" component={shopingCart} />
        <Route path="/viewBook/:id" component={viewBook} /> 
      </Router>
    </Provider>
  );
}
export default App;
