import React from 'react';
import { Redirect } from 'react-router-dom';

const Main: React.FC = () => {
    let redirect:any = localStorage.getItem('isAdmin');
    switch(redirect){
    case 'false':
        return <Redirect to='/userHome' />
    case 'true':
        return <Redirect to='/adminHome' />
    }
    return(
        <div className="main">
           <h1>Welcom to here!</h1>
           <h2>Please Login or Register!</h2>
        </div>
    )
}
export default Main;