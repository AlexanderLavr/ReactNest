import React from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { connect } from 'react-redux';
import '../../../style/tableBooks.css';
import AdminModalBooks from '../../../actionsComponents/actAdminModalBooks'; 
import imageEdit from '../../../images/editButton.svg'; 
import { openModaladdBooks, setDeleteArrayBook, deleteBook, getEditBook } from '../../../redux/admin/adminBooks/actions';

interface Data {
  title: string;
  id: string;
  price: string;
  amount: string;
}
  
function desc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

type Order = 'asc' | 'desc';

function getSorting<K extends keyof any>(
  order: Order,
  orderBy: K,
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

interface HeadRow {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headRows: HeadRow[] = [
  { id: 'title', numeric: false, disablePadding: true, label: 'Title' },     
  { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },   
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },    
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
              {orderBy === row.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
  }),
);


const EnhancedTableToolbar:React.FC<any> = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, move , deleteBooks} = props;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} deleted
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Books
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
           <IconButton
              onClick = {() => {deleteBooks()}}
              aria-label="delete" >  
              <DeleteIcon /> 
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

function EnhancedTable(props:any) {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('amount');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  let books = props.arrayBooks;
  
  function handleRequestSort(event: React.MouseEvent<unknown>, property: keyof Data) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {  
      const newSelecteds = books.map((n:any) => n._id);//-------------------------------------------------
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event: React.MouseEvent<unknown>, name: string) {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function handleChangeDense(event: React.ChangeEvent<HTMLInputElement>) {
    setDense(event.target.checked);
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, books.length - page * rowsPerPage);


  function move(){//checkd delet books to redux
    let body = selected;
    if(body.length !== 0){ 
      props.setDeleteArrayBook(body)
    } 
  }
  function deleteBook(){
    props.deleteBook(props.checkDeleteBooks)
  }

  function editBook(e:any, props:any){
    let element:HTMLButtonElement = e.currentTarget; 
    let id:string = String(element.id).substr(2, )
    props.getEditBook(id)
  }
  function setModal(){
    if(props.openAdminModalBooks === true){
      return <AdminModalBooks/>
    }
  }
  return (
    <div>  
        {setModal()}
        <div className={classes.root}>
        <Paper className={classes.paper}>
            <EnhancedTableToolbar
            move={move()}
            deleteBooks={deleteBook}
            onClick={()=>{move()}}
            numSelected={selected.length} />
            <div className={classes.tableWrapper}>
            <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
            >
                <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={books.length}
                />
                <TableBody>
                {stableSort(books, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((book:any, index) => {
                    const isItemSelected = isSelected(book._id);//----------------------------------
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                        id={book.title}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={`${book.title}+${book._id}`} //----------------------------------
                        selected={isItemSelected}
                        >
                        <TableCell padding="checkbox">
                            <Checkbox
                            onClick={event => handleClick(event, book._id)} //----------------------------------
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                            {book.title}
                        </TableCell>
                        <TableCell align="right">{book._id}</TableCell>
                        <TableCell align="right">{book.price}</TableCell>
                        <TableCell align="right">{book.amount}</TableCell>
                        <TableCell align="right">
                          <button  className="edit-tableBooks"  
                            onClick={(e)=>{e.preventDefault(); editBook(e, props)}}
                            id={`el${book._id}`}>
                            <img src={imageEdit} alt=""/> 
                          </button>
                        </TableCell>
                        </TableRow>
                      );
                    })}  
                {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </div>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={books.length}
            rowsPerPage={rowsPerPage} 
            page={page}
            backIconButtonProps={{
                'aria-label': 'previous page',
            }}
            nextIconButtonProps={{
                'aria-label': 'next page',
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
        <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
        />
        </div>
        <button id="add-books" onClick={()=>{props.openModaladdBooks()}}>Add Books</button>
    </div>
  );
}



const mapStateToProps = (state: any) => ({
    arrayBooks: state.adminBooks.arrayBooks,
    checkDeleteBooks: state.adminBooks.checkDeleteBooks,
    openAdminModalBooks: state.adminBooks.openAdminModalBooks
});

export default connect(
    mapStateToProps,
    { openModaladdBooks, setDeleteArrayBook, deleteBook, getEditBook }
)(EnhancedTable); 