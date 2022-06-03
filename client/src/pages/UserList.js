import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import { listUsers, deleteUser } from '../redux/actions/userActions'

const UserList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if(userInfo && userInfo.user.role === 'admin') {
        dispatch(listUsers())
    } else {
        navigate('/login')
    }
  }, [dispatch, navigate, userInfo, successDelete]) 

  // in use effect pass successDelete and if that changes use effect run again , list users reload

  const deleteUserHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id))
    }
  }

  return <>
    <Meta title={'Admin User List Page'} />

    {loading ? <Loading message='Loading users...' /> : 
     error ? <Alert severity='error'>{error}</Alert> : (
       <Grid container spacing={2}>
        <Grid item xs={12}>
        <Typography variant='h4'>USERS</Typography>
          <TableContainer sx={{ mt: 2}} component={Paper}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">NAME</TableCell>
                <TableCell align="center">EMAIL</TableCell>
                <TableCell align="center">ADMIN</TableCell>
                <TableCell align="center">REGISTER DATE</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell component="th" scope="row">
                    {user._id}
                  </TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center"><a href={`mailto:${user.email}`}>{user.email}</a></TableCell>
                  <TableCell align="center">{user.role === 'admin' ? (<CheckIcon style={{ color: 'green'}} />) : (<ClearIcon style={{ color: 'red'}} />)}</TableCell>
                  <TableCell align="center">{user.createdAt.substring(0, 10)}</TableCell>
                  <TableCell align="center"><IconButton  component={Link} to={`/admin/user/${user._id}/update`}><EditIcon style={{ color: 'teal'}} /></IconButton> 
                  <IconButton onClick={() => deleteUserHandler(user._id)}><DeleteIcon style={{ color: 'red'}} /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      </Grid>
     )}
     
  </>
}

export default UserList
