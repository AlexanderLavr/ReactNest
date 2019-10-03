import React from 'react';
import '../src/style/app.css';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import HeaderNav from './actions.components/action.header';
import Login from './actions.components/action.login';
import Main from './components/main';
import Regestration from './actions.components/action.regictration';
import UserHome from './actions.components/action.user.home';
import AdminHome from './actions.components/action.admin.home';
import Profile from './actions.components/action.profile';
import viewBook from './components/user/view.book';
import shopingCart from './components/user/shoping.cart';


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
