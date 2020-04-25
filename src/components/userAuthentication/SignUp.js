import API from "../../utils/API";
import React, { useState } from "react";
import Loader from "../mainComponents/Loader";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import sendLog from "../../utils/Logger";

const SignUp = () => {
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [SignUpMsg, setSignUpMsg] = useState("");

  function onSignUp() {
    setIsLoading(true);
    // Post request to backend
    API.post("users/signup", {
      email: signUpEmail,
      password: signUpPassword,
      firstName: signUpFirstName,
      lastName: signUpLastName,
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.success) {
            setSignUpMsg(res.data.message);
            setIsLoading(false);
            setSignUpEmail("");
            setSignUpFirstName("");
            setSignUpLastName("");
            setSignUpPassword("");
          } else {
            setSignUpMsg(res.data.message);
            setIsLoading(false);
          }
        } else {
          const error = new Error(res.data.message);
          throw error;
        }
      })
      .catch((err) => {
        sendLog("error", err);
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
      <Container
        component="main"
        maxWidth="xs"
        style={{ backgroundColor: "white", height: "60%" }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h3" vh1iant="h5" style={{ color: "black" }}>
            Sign up
          </Typography>
          {SignUpMsg ? (
            <Typography component="h1" variant="h5" style={{ color: "purple" }}>
              {" "}
              {SignUpMsg}{" "}
            </Typography>
          ) : null}
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="signUpFirstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="signUpFirstName"
                  label="First Name"
                  onBlur={(e) => {
                    setSignUpFirstName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="signUpLastName"
                  label="Last Name"
                  name="signUpLastName"
                  autoComplete="lname"
                  onBlur={(e) => {
                    setSignUpLastName(e.target.value);
                  }}
                />
              </Grid>
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
                    setSignUpEmail(e.target.value);
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
                    setSignUpPassword(e.target.value);
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
              onClick={onSignUp}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    );
  }
};

export default SignUp;
