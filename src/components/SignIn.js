import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const SignIn = () => {
  const [email, setEmail] = useState({ value: "", error: null });
  const [password, setPassword] = useState({ value: "", error: null });
  const history = useNavigate();

  const emailChange = (e) => {
    setEmail({ ...email, value: e.target.value });
  };

  const handleSubmit = async () => {
    if (email.value.trim() === "") {
      setEmail({
        ...email,
        error: "please add your email",
      });
    }
    if (password.value.trim() === "") {
      setPassword({
        ...password,
        error: "please add your password",
      });
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}api/users/login`,
        { email: email.value, password: password.value },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      history("/home");
      toast.success("Logged in successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. please try again later");
    }
  };

  return (
    <div>
      {/* <form
        onSubmit={handleSubmit}
        style={{ width: "20rem", height: "100rem" }}
      > */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Email"
            fullWidth
            type="email"
            placeholder="enter your email"
            value={email.value}
            onChange={emailChange}
            error={Boolean(email.error)}
            helperText={email.error}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Password"
            fullWidth
            type="password"
            placeholder="enter your password"
            value={password.value}
            onChange={(e) =>
              setPassword((prev) => ({ ...prev, value: e.target.value }))
            }
            error={Boolean(password.error)}
            helperText={password.error}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      {/* </form> */}
    </div>
  );
};

export default SignIn;
