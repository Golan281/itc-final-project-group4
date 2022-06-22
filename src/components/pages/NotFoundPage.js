import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import logo from "../images/tabCollectLogo.PNG";

const theme = createTheme();

export default function NotFoundPage() {
  const navigate = useNavigate();

  const onNotFoundPage = () => {
    navigate("/home");
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
            404
          </Typography>
          <Typography component="h1" variant="h5">
            Page Not Found
          </Typography>
          <Stack sx={{ width: "550px", alignItems: "center" }} spacing={2}>
            <Alert severity="warning">
              <AlertTitle>Alert</AlertTitle>
              you are lost..."
            </Alert>
          </Stack>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onNotFoundPage}
          >
            go back
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
