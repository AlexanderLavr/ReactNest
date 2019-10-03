import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { all } from 'redux-saga/effects';
import { doRegistration } from './regestration/sagasRegestration';
import { doLogin } from './login/sagasLogin';
import { doHeader } from './header/sagasHeader';
import { doAdminBooks } from './admin/adminBooks/sagasAdminBooks'; 
import { saveImage } from './profile/sagasProfile';
import { doAdmin } from './admin/sagaAdmin';
import { doUser } from './user/sagasUser';


export default function configStore(initialState?:any):any{
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const composeEnhancers = composeWithDevTools({});

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, initialState!, enhancer);

  let m = module as any;
  if (m.hot) {
    m.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  sagaMiddleware.run(function*() {
      yield all([doRegistration(), doLogin(), doHeader(), saveImage(), doAdmin(), doAdminBooks(), doUser()]);
  });
  return store
}