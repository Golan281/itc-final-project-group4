import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../Context/userContext";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import logo from "../images/tabCollectLogo.PNG";

const theme = createTheme();

export default function SignUp() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repassword: "",
  });
  const { addUser } = useContext(userContext);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const navigate = useNavigate();

  const handleChangeSignUp = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitSignUp = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "http://localhost:8000/v1/auth/register",
        user
      );
      if (res.data) {
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          repassword: "",
        });

        addUser({ ...user });
        navigate("/");
        setAlertContent("Thanks for signing up. Please Log in.");
        setAlert(true);
      }
    } catch (err) {
      setAlertContent(err.message);
      setAlert(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt ="tabCollect" style= {{width:"100%"}}
/>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Stack sx={{ width: "100%" }} spacing={2}>
            {alert ? (
              <Alert severity="info">
                <AlertTitle>Alert</AlertTitle>
                {alertContent}
              </Alert>
            ) : (
              <div></div>
            )}
          </Stack>
          <Box
            component="form"
            noValidate
            //onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChangeSignUp}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChangeSignUp}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChangeSignUp}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="repassword"
                  label="rePassword"
                  type="password"
                  id="repassword"
                  autoComplete="repassword"
                  onChange={handleChangeSignUp}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSubmitSignUp}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/signIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
