import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root.reducer';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { all } from 'redux-saga/effects';
import { doRegistration } from './registration/sagas.registration';
import { doLogin } from './login/sagas.login';
import { doHeader } from './header/sagas.header';
import { doAdminBooks } from './admin/admin.books/sagas.admin.books'; 
import { saveImage } from './profile/sagas.profile';
import { doAdmin } from './admin/sagas.admin';
import { doUser } from './user/sagas.user';


export default function configStore(initialState?:any):any{
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const composeEnhancers = composeWithDevTools({});

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, initialState!, enhancer);

  let m = module as any;
  if (m.hot) {
    m.hot.accept('./root.reducer', () => {
      const nextRootReducer = require('./root.reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  sagaMiddleware.run(function*() {
      yield all([doRegistration(), doLogin(), doHeader(), saveImage(), doAdmin(), doAdminBooks(), doUser()]);
  });
  return store
}