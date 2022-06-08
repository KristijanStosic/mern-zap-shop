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
  Button,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import { getAllPublishers, deletePublisher } from '../redux/actions/publisherActions'

const PublisherList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const publisherList = useSelector((state) => state.publisherList)
  const { loading, error, publishers } = publisherList

  const publisherDelete = useSelector((state) => state.publisherDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = publisherDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.user.role === 'admin') {
      dispatch(getAllPublishers())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo, successDelete])

  const deletePublisherHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this publisher?')) {
      dispatch(deletePublisher(id))
    }
  }

  return (
    <>
      <Meta title={'Admin Publisher List Page'} />
      {loadingDelete && <Loading message='Deleting publisher...' />}
      {errorDelete && <Alert severity='error'>{errorDelete}</Alert>}
      {loading ? (
        <Loading message='Loading publishers...' />
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        <Grid container spacing={2} sx={{ mt: 2}}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant='h4'>PUBLISHERS</Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button component={Link} to='/admin/publisher-create' variant='contained' color='primary' startIcon={<AddBoxIcon />}>
                  CREATE PUBLISHER
                </Button>
              </Grid>
            </Grid>
            <TableContainer sx={{ mt: 2 }} component={Paper}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align='center'>NAME</TableCell>
                    <TableCell align='center'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {publishers.map((publisher) => (
                    <TableRow key={publisher._id}>
                      <TableCell component='th' scope='row'>
                        {publisher._id}
                      </TableCell>
                      <TableCell align='center'>{publisher.name}</TableCell>
                      <TableCell align="center">
                        <IconButton 
                        component={Link} 
                        to={`/admin/publisher/${publisher._id}/update`}>
                            <EditIcon style={{ color: 'teal'}} />
                        </IconButton> 
                        <IconButton 
                        onClick={() => deletePublisherHandler(publisher._id)}>
                            <DeleteIcon style={{ color: 'red'}} />
                            </IconButton>
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
  )
}

export default PublisherList
