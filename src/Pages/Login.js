import React, { useState } from "react";
import SignIn from "../components/SignIn";
import Register from "../components/Register";
import { Button, Container, Typography, Box } from "@mui/material";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Typography variant="h3" gutterBottom>
          Welcome to FavFlix
        </Typography>
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsLogin(true)}
            style={{ marginRight: 10 }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsLogin(false)}
          >
            Register
          </Button>
        </div>
      </Box>
      <Box mt={5}>{isLogin ? <SignIn /> : <Register />}</Box>
    </Container>
  );
};

export default Login;
