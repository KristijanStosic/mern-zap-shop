import { Link } from 'react-router-dom'
import { Typography, Grid, Button } from '@mui/material'
import Meta from '../components/Meta'

function Home() {
  return (
    <>
      <Meta title={'Home Page'} />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography variant='h4'>Welcome to ZAP SHOP!</Typography>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perferendis doloremque autem vel delectus quas tempore architecto
            labore facere? Molestiae aliquid laboriosam, eius debitis, pariatur
            temporibus beatae nulla hic ad placeat voluptates sit eos error
            fugiat, magnam vitae magni? Eius odio illo eum vero assumenda
            repudiandae beatae nemo nam doloremque mollitia atque, voluptates ab
            ipsa culpa doloribus sit. Dicta magnam, dolor vitae cupiditate
            quaerat iusto hic autem alias dolores est repellat porro suscipit
            tempore cum in, accusantium amet quasi, sequi ipsa atque consectetur
            ducimus labore necessitatibus veniam. Alias, totam sapiente iste
            molestiae tempore ullam vel velit vero, necessitatibus fugit,
            corrupti porro.
          </p>
          <Button
            sx={{ height: '55px' }}
            color='primary'
            size='large'
            variant='contained'
            fullWidth
            component={Link} 
            to='/products'
          >
            SHOP NOW!
          </Button>
        </Grid>
        <Grid item xs={6}>
          <img src='' alt='zap shop main' className='img main-img' />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
