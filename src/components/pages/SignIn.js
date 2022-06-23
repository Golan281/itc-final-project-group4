import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import logo from "../images/tabCollectLogo.PNG";
import useStore from "../../Store/useStore";

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const navigate = useNavigate();
  const LOGIN_URL = "http://localhost:8000/v1/auth/login";

  const onSubmitLogin = async (e) => {
    try {
      console.log('just for netlify test',currentUser);
      e.preventDefault();
      const user = {
        email: email,
        password: password,
      };

      const res = await axios.post(LOGIN_URL, JSON.stringify({ ...user }), {
        headers: { "content-type": "application/json" },
        withCredentials: true,
      });

      if (res.data) {
        console.log(res.data);
        setEmail("");
        setPassword("");
        localStorage.setItem(
          "accessToken",
          JSON.stringify(res.data.accessToken)
        );
        setCurrentUser(res.data);
        setAlertContent("Thanks for signing up. Please Log in.");
        setAlert(true);
        navigate("/");
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
          <img src={logo} alt="tabCollect" style={{ width: "100%" }} />
          <Typography component="h1" variant="h5">
            Sign in
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
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSubmitLogin}
            >
              Sign In
            </Button>

            <Grid container justifyContent="center"></Grid>
          </Box>
        </Box>{" "}
      </Container>
    </ThemeProvider>
  );
}
