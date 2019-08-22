import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  makeStyles, Container, Paper, Typography, TextField, Divider,
} from '@material-ui/core';
import clsx from 'clsx';
import { isEmpty, isEmail } from '../../utils/validators';
import MyDefaultButton from '../common/MyDefaultButton';
import MyCircularProgress from '../common/MyCircularProgress';
import { forgotPassword, sendOtp, setError } from '../../actions/authActions';
import { FORGOT_PASSWORD, SEND_OTP } from '../../actions/types';

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
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  emailContactPaper: {
    marginTop: theme.spacing(3),
  },
}));

const ForgotPassword = ({
  intl: { formatMessage }, forgotPassword, sendOtp, setError, auth,
}) => {
  const classes = useStyles();

  const [email, setEmail] = useState(auth.currentUser.login ? auth.currentUser.login.loginId : '');
  const [contact, setContact] = useState('');
  const [emailError, setEmailError] = useState({
    error: false,
    message: '',
  });
  const [toLogin, setToLogin] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setContact('');
    // Reset Redux error
    setError(false, '', '', FORGOT_PASSWORD);
  };

  const emailValidation = () => {
    const emailValid = email.replace(/ /g, '');
    setEmail(emailValid);
    if (isEmpty(emailValid)) {
      setEmailError({
        error: true,
        message: formatMessage({ id: 'error.email.required' }),
      });
      return false;
    } if (!isEmail(emailValid)) {
      setEmailError({
        error: true,
        message: formatMessage({ id: 'error.email.invalid' }),
      });
      return false;
    }
    setEmailError({
      error: false,
      message: '',
    });
    return true;
  };

  const inputsValidation = () => {
    const emailValid = emailValidation();
    return emailValid;
  };

  const onSubmitForgotPassword = () => {
    if (inputsValidation()) {
      forgotPassword({
        loginId: email.replace(/ /g, ''),
      },
        (user) => setContact(user.email));
    }
  };
  const keyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmitForgotPassword();
    }
  };

  const onSubmitSendOtp = (method, contact) => {
    sendOtp({
      loginId: email.replace(/ /g, ''),
      method,
      contact,
    },
      () => setToLogin(true));
  };

  const contactPaper = (
    <Paper className={clsx(classes.paper, classes.emailContactPaper)}>
      <Typography component="h1" variant="h5">
        <FormattedMessage id='forgotPassword.sendOtp' />
      </Typography>
      <Typography component="h1" variant="h6" noWrap>
        {contact}
      </Typography>
      <MyDefaultButton
        className={classes.submit}
        onClick={() => onSubmitSendOtp('email', contact)}
        disabled={auth.loadings[SEND_OTP]}
      >
        {auth.loadings[SEND_OTP]
          ? <MyCircularProgress />
          : <FormattedMessage id='forgotPassword.sendEmail' />
        }
      </MyDefaultButton>
      {auth.errors[SEND_OTP] && auth.errors[SEND_OTP].hasFailed ? (
        <Typography color='error' variant="body1">
          {auth.errors[SEND_OTP].message}
        </Typography>
      ) : null}
    </Paper>
  );

  // Redirect to login page if opt sent
  if (toLogin) {
    return (
      <Redirect to={{
        pathname: '/login',
      }} />
    );
  }

  return (
    <Container maxWidth='xs'>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          <FormattedMessage id='forgotPassword.title' />
        </Typography>
        <Divider className={classes.divider} />
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={formatMessage({ id: 'forgotPassword.email' })}
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => { setEmailError({ error: false, message: '' }); handleChangeEmail(e); }}
            error={emailError.error}
            helperText={emailError.message}
            onKeyPress={keyPress}
          />
          {auth.errors[FORGOT_PASSWORD] && auth.errors[FORGOT_PASSWORD].hasFailed ? (
            <Typography color='error' variant="body1">
              {auth.errors[FORGOT_PASSWORD].message}
            </Typography>
          ) : null}
          <MyDefaultButton
            className={classes.submit}
            onClick={onSubmitForgotPassword}
            disabled={auth.loadings[FORGOT_PASSWORD]}
          >
            {auth.loadings[FORGOT_PASSWORD]
              ? <MyCircularProgress />
              : <FormattedMessage id='forgotPassword.checkEmail' />
            }
          </MyDefaultButton>
        </form>
      </Paper>
      {!isEmpty(contact)
        ? contactPaper
        : null}
    </Container>
  );
};

ForgotPassword.propTypes = {
  intl: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  sendOtp: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { forgotPassword, sendOtp, setError },
)(injectIntl(ForgotPassword));
