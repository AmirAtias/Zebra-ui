import API from "../../utils/API";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../mainComponents/Loader";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { UserNameContext } from "../mainComponents/AppContext";
import sendLog from "../../utils/Logger";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [userName, setUserName] = useContext(UserNameContext);

  let history = useHistory();

  async function onSignIn() {
    setIsLoading(true);

    // Post request to backend
    API.post("/users/signin", {
      email: signInEmail,
      password: signInPassword,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("json", res.data);
          if (res.data.success) {
            console.log(res.data.message);
            setUserName(res.data.userName);
            history.push("/");
          } else {
            setSignInError(res.data.message);
            setIsLoading(false);
          }
        } else {
          const error = new Error(res.data.message);
          throw error;
        }
      })
      .catch((err) => {
        sendLog("error", err);
        console.log(err);
        window.location.replace("/");
      });
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <Container component="main" maxWidth="xs" style={{ height: "60%" }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h3" vh1iant="h5" style={{ color: "black" }}>
            Sign In
          </Typography>
          {signInError ? (
            <Typography component="h1" variant="h5" style={{ color: "purple" }}>
              {signInError}
            </Typography>
          ) : null}
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onBlur={(e) => {
                    setSignInEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onBlur={(e) => {
                    setSignInPassword(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSignIn}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    );
  }
};
export default SignIn;
