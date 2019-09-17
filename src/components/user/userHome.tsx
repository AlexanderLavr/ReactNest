import React from 'react';
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
            <div style={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap'
            }}>
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
                <div style={{
                    width: '100wh', 
                    height: '100vh', 
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'center'
                }}>
                    <CircularProgress style={{width: '100px'}} />
                </div>
            )
        }
    }
    componentDidMount(){
        this.props.queryServer()
    }
}

