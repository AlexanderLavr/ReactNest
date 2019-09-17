import React from 'react';
import ReactDOM from "react-dom";
import '../src/style/index.css';
import  App  from './App';
import * as serviceWorker from './serviceWorker';



const mainRoute = document.getElementById('root');
ReactDOM.render(
    <App />,
    mainRoute);

serviceWorker.unregister();
