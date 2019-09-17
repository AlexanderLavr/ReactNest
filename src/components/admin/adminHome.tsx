import React from 'react';
import SimpleTabs from './tabsAdminHome';
import { Redirect } from 'react-router-dom';


export class AdminHome extends React.Component<any>{
  componentDidMount(){
    this.props.queryServer()
  }
  render(){
    let redirect:any = localStorage.getItem('isAdmin');
    switch(redirect){
      case null:
        return <Redirect to='/' />
      case 'false':
        return <Redirect to='/userHome' />
    }
    return(
      <SimpleTabs></SimpleTabs>
    )
  }
}



