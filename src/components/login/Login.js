import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  makeStyles, Container, Paper, Avatar, Typography, TextField, FormControlLabel, Checkbox, Link,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { isEmpty, isEmail } from '../../utils/validators';
import { loginUser, setError } from '../../actions/authActions';
import MyDefaultButton from '../common/MyDefaultButton';
import MyCircularProgress from '../common/MyCircularProgress';
import { LOGIN } from '../../actions/types';
import { getLocalStorage, keyRememberMe, setLocalStorage } from '../../utils/localStorages';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'transparent',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  submit: {
    width: '100%',
    margin: theme.spacing(2, 0, 2),
  },
}));

const Login = ({
  intl: { formatMessage }, loginUser, setError, auth, location,
}) => {
  const from = location.state && location.state.from && location.state.from.pathname
    ? location.state.from.pathname : '/';

  const classes = useStyles();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(getLocalStorage(keyRememberMe));
  const [emailError, setEmailError] = useState({
    error: false,
    message: '',
  });
  const [passwordError, setPasswordError] = useState({
    error: false,
    message: '',
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    // Reset Redux error
    setError(false, '', '', LOGIN);
  };

  const emailValidation = () => {
    if (isEmpty(loginData.email)) {
      setEmailError({
        error: true,
        message: formatMessage({ id: 'login.error.email.required' }),
      });
      return false;
    } if (!isEmail(loginData.email)) {
      setEmailError({
        error: true,
        message: formatMessage({ id: 'login.error.email.invalid' }),
      });
      return false;
    }
    setEmailError({
      error: false,
      message: '',
    });
    return true;
  };

  const passwordValidation = () => {
    if (isEmpty(loginData.password)) {
      setPasswordError({
        error: true,
        message: formatMessage({ id: 'login.error.password.required' }),
      });
      return false;
    }
    setPasswordError({
      error: false,
      message: '',
    });
    return true;
  };

  const inputsValidation = () => {
    const emailValid = emailValidation();
    const passwordValid = passwordValidation();
    return emailValid && passwordValid;
  };

  const onSubmit = () => {
    if (inputsValidation()) {
      setLocalStorage(keyRememberMe, rememberMe);
      loginUser({
        loginId: loginData.email,
        password: loginData.password,
      },
      rememberMe);
    }
  };

  const keyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  // Redirect to the page wanted if user logged
  if (auth.isAuthenticated) {
    return (
      <Redirect to={{
        pathname: from,
      }} />
    );
  }

  return (
    <Container maxWidth='xs'>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon color='primary' />
        </Avatar>
        <Typography component="h1" variant="h5">
          <FormattedMessage id='login.title' />
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={formatMessage({ id: 'login.email' })}
            name="email"
            autoComplete="email"
            autoFocus
            value={loginData.email}
            onChange={(e) => { setEmailError({ error: false, message: '' }); handleChange(e); }}
            error={emailError.error}
            helperText={emailError.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={formatMessage({ id: 'login.password' })}
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginData.password}
            onChange={(e) => { setPasswordError({ error: false, message: '' }); handleChange(e); }}
            error={passwordError.error}
            helperText={passwordError.message}
            onKeyPress={keyPress}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={formatMessage({ id: 'login.rememberMe' })}
            value={rememberMe}
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          {auth.errors[LOGIN] && auth.errors[LOGIN].hasFailed ? (
            <Typography color='error' variant="body1">
              {auth.errors[LOGIN].message}
            </Typography>
          ) : null}
          <MyDefaultButton
            className={classes.submit}
            onClick={onSubmit}
            disabled={auth.loadings[LOGIN]}
          >
            {auth.loadings[LOGIN]
              ? <MyCircularProgress />
              : <FormattedMessage id='login.login' />
            }
          </MyDefaultButton>
          <Link component={RouterLink} to="/forgotpassword" variant="body2">
            <FormattedMessage id='login.forgotPassword' />
          </Link>
        </form>
      </Paper>
    </Container>
  );
};

Login.propTypes = {
  intl: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { loginUser, setError },
)(injectIntl(Login));
