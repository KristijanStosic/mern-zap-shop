import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {
  Typography,
  Paper,
  Container,
  Divider,
  List,
  ListItem,
  Button,
} from '@mui/material'
import { getAddressDetails } from '../redux/actions/addressActions'
import Alert from '../components/Alert'
import Meta from '../components/Meta'
import Loading from '../components/Loading'

const MyAddress = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const addressDetails = useSelector((state) => state.addressDetails)
  const { loading, error, address } = addressDetails

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!address || !address.street || !address.city) {
        dispatch(getAddressDetails('my-address'))
      } 
    }
  }, [dispatch, navigate, userInfo, address])

  return (
    <>
      <Meta title={'My Address Page'} />
      {loading && <Loading message='Loading address...' />}
      {error ? (
        <Alert severity='error'>
          There is no address for this account, please{' '}
          <Link to='/address-create'>CREATE</Link> one
        </Alert>
      ) : (
        <>
          <Container component='main' maxWidth='sm'>
            <Paper
              variant='outlined'
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Typography variant='h3'>ADDRESS DETAILS</Typography>
              <Divider sx={{ m: 1 }} />
              <List>
                <ListItem>
                  <Typography variant='h6'>Street: {address.street}</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h6'>City: {address.city}</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h6'>
                    Postal Code: {address.postalCode}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h6'>
                    Country: {address.country}
                  </Typography>
                </ListItem>
                <Button
                  variant='contained'
                  color='primary'
                  component={Link}
                  to={`/address-update/${address._id}/update`}
                >
                  UPDATE ADDRESS
                </Button>
              </List>
            </Paper>
          </Container>
        </>
      )}
    </>
  )
}

export default MyAddress
