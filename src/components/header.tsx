import React from 'react';
import { Link } from 'react-router-dom';
import  shopingCart  from '../images/shopping-cart.svg';
import Badge from '@material-ui/core/Badge';

interface HeaderNavState {
    active: boolean
}

export class HeaderNav extends React.Component<any>{
    state:HeaderNavState = {
        active: false
    }
    toggleClass():void{
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };
    logOut():void{
        localStorage.clear()
        this.props.logOut()
    }
     render(){
        if(this.props.loginSuc && this.props.userIsAdmin===false){//!Admin
            return(
                <ul className="app-nav">
                <li><Link to="/userHome">User Home</Link></li>
                <li>
                    <ul style={{display: "flex"}}>
                        <li 
                        style={{position: "relative", cursor: "pointer"}}
                        onClick={()=>{this.toggleClass()}}>Hello: {this.props.loginEmail}! 
                            <ul className={`dropdown-list ${this.state.active?'dropdown-list-active': ''}`}>
                                <li><Link to="./profile">User Profile</Link></li>
                                <li onClick={()=>{this.logOut()}}><Link to="./">Log Out</Link></li>
                            </ul>
                        </li>
                        <li><img src={this.props.imageProfile} className="headerIcon" alt="profile"/></li>
                        <li>
                            <div style={{position: 'relative'}}>
                                <Link to="./shopingCart"><img src={shopingCart} className="headerIcon" alt="cart"/></Link>
                                <Badge style={{
                                    position: 'absolute',
                                    top: '2px',
                                    right: '0'
                                }} color="primary" badgeContent={this.props.countBook}> </Badge>   
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            )
        }else if(this.props.loginSuc && this.props.userIsAdmin===true){//Admin
        
            return(
                <ul className="app-nav">
                    <li><Link to="/adminHome">Admin Home</Link></li>
                    <li>
                        <ul style={{display: "flex"}}>
                            <li 
                            style={{position: "relative", cursor: "pointer"}}
                            onClick={()=>{this.toggleClass()}}>Hello: {this.props.loginEmail}! 
                                <ul className={`dropdown-list ${this.state.active?'dropdown-list-active': ''}`}>
                                    <li><Link to="/profile">Admin Profile</Link></li>
                                    <li onClick={()=>{this.logOut()}}><Link to="./">Log Out</Link></li>
                                </ul>
                            </li>
                            <li><img src={this.props.imageProfile} className="headerIcon" alt="profile"/></li>
                        </ul>
                    </li>
                </ul>
            )
        }
        return (
            <ul className="app-nav">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/regestration">Regestration</Link></li>
            </ul>
        )
        
    }
    componentDidMount(){
        let localStorUser:any = localStorage.getItem('user');
        if(localStorUser){
            this.props.localStoreUser(JSON.parse(localStorUser))
        }
    }
}



