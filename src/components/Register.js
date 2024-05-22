import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Register = () => {
  const [email, setEmail] = useState({ value: "", error: null });
  const [password, setPassword] = useState({ value: "", error: null });
  const [name, setName] = useState({ value: "", error: null });
  const history = useNavigate();

  const emailChange = (e) => {
    setEmail({ ...email, value: e.target.value });
  };

  const passwordChange = (e) => {
    setPassword({ ...password, value: e.target.value });
  };

  const nameChange = (e) => {
    setName({ ...name, value: e.target.value });
  };

  const handleSubmit = async () => {
    if (name.value.trim() === "") {
      setName({
        ...name,
        error: "Please add name",
      });
    }
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
        `${BASE_URL}api/users`,
        { name: name.value, email: email.value, password: password.value },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      history("/home");
      toast.success("User created successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Name"
            fullWidth
            type="text"
            placeholder="enter your name"
            value={name.value}
            onChange={nameChange}
            error={Boolean(name.error)}
            helperText={name.error}
          />
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
            onChange={passwordChange}
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

export default Register;
