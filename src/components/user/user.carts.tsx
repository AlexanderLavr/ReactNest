import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selBook, addBooks } from '../../redux/user/actions.user';



const useStyles = makeStyles({ 
    card: {
        maxWidth: 345,
    },
    media: {
        height: 500,
    },
});


function selectBook(e:any, props:any):void{
    let element:HTMLButtonElement = e.currentTarget;
    let id:string = element.id.substr(2, );
    props.selBook(id)
}

function addBook(e:any, props:any):void{
    let element:HTMLButtonElement = e.currentTarget;
    let id:string = element.id.substr(2, );
    props.addBooks(id)
}


function MediaCard(props:any){
    const classes = useStyles();
    const {title, image, description, id}=props

    return (
        <div style={{width: '20%', padding: '10px'}}>
            <Card>
                <Link to={`/viewBook/${id}`}>
                    <CardActionArea id={`el${id}`} onClick={(e)=>selectBook(e, props)}> 
                        <CardMedia 
                        className={classes.media}
                        image={image} 
                        />
                        <CardContent>
                            <Typography >
                                {title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {`${description.substring(0,23)}...`}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
                <CardActions>
                    <Button size="small" id={`ad${id}`} color="primary" onClick={(e)=>addBook(e, props)}>
                        В корзину
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}
const mapStateToProps = (state: any) => ({
    serverBooks: state.userBooks.serverBooks,
});

export default connect(
    mapStateToProps,
    { selBook, addBooks }
)(MediaCard);