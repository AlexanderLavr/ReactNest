import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { deleteUser, editUser } from '../../../redux/admin/actions.admin';
import AdminModal from './modal.users';
import imageDelete from '../../../images/delete.svg';
import imageEdit from '../../../images/editButton.svg';


const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  }),
);


let buttonEdit = (e:any, props:any) =>{
  let elem:any = e.currentTarget;
  let id:string = elem.id.substring(2, )
  props.editUser(id)
}
let buttonDelete = (e:any, props:any) =>{
  let elem:any = e.currentTarget
  let id:string = elem.id.substring(2, )
  props.deleteUser(id)
}



function SimpleTable(props:any) {
  const classes = useStyles();
  let checkModal = () =>{
    if(props.openAdminModal){
      return <AdminModal />
    }
  }
  return (
    <div>
      {checkModal()}
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Firstname</TableCell>
              <TableCell align="right">Secondname</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.serverArray.map((el:any, i:number) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {el.id}
                </TableCell>
                <TableCell align="right">{el.firstname}</TableCell>
                <TableCell align="right">{el.secondname}</TableCell>
                <TableCell align="right">{el.email}</TableCell>  
                <TableCell align="right">
                  <button className="tableUsers-edit" onClick={(e:any)=>{buttonEdit(e, props)}} id={`ed${el.id}`}>
                    <img src={imageEdit} alt=""/> 
                  </button>
                  </TableCell>
                <TableCell align="right">
                  <button  className="tableUsers-delete" onClick={(e:any)=>{buttonDelete(e, props)}} id={`de${el.id}`}>
                    <img src={imageDelete} alt=""/>
                  </button>
                  </TableCell>
              </TableRow>
            )
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
    serverArray: state.admin.serverArray,
    openAdminModal: state.admin.openAdminModal,
    editUserServer: state.admin.editUserServer
});

export default connect(
    mapStateToProps,
    { deleteUser, editUser }
)(SimpleTable);