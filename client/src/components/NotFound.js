import { Button, Container, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";

const NotFound = () => {
  return (
    <>
    <Meta title={'404 - Not Found'} />
    <Container maxWidth='md'>
        <Typography variant='h3'>sorry, there is nothing here</Typography>
        <Divider />
        <Button fullWidth component={Link} to='/products'>Go back to shop</Button>
    </Container>
    </>
)
};


export default NotFound;
