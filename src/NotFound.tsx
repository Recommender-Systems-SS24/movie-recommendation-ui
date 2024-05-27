import { Container } from "@mui/material";

const NotFound = () => {
  return (
    <Container
      sx={{
        flexGrow: 1,
        padding: 2,
        display: 'flex',
        justifyContent: 'center', // centers horizontally
        alignItems: 'center', // centers vertically
      }}
    >
      <div>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <p> ... or you don't have access to it.</p>
      </div>
    </Container>
  );
};

export default NotFound;
