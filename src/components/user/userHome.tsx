import React from 'react';
import '../../style/userHome.css';
import MediaCard from './userCarts';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';


export class UserHome extends React.Component<any>{
    render(){
        let redirect:any = localStorage.getItem('isAdmin');
        switch(redirect){
        case null:
            return <Redirect to='/' />
        case 'true':
            return <Redirect to='/adminHome' />
        }
        if(Object.keys(this.props.serverBooks).length !== 0){
            return ( 
            <div className="container-user-home">
                {this.props.serverBooks.map((elem:any, i:number)=>{
                    return <MediaCard
                        key={i}
                        id={elem._id}
                        title={elem.title}
                        image={elem.choosePhoto}
                        description={elem.description}
                    />
                })}
            </div>)
        }else{
            return(
                <div className="container-loader">
                    <CircularProgress style={{width: '100px'}} />
                </div>
            )
        }
    }
    componentDidMount(){
        this.props.queryServer()
    }
}

