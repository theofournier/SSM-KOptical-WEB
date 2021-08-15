import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  makeStyles,
  Typography,
  TextField,
  Link,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { isEmpty } from '../../utils/validators';
import { changePassword, setError } from '../../actions/authActions';
import MyDefaultButton from '../common/MyDefaultButton';
import MyCircularProgress from '../common/MyCircularProgress';
import { CHANGE_PASSWORD } from '../../actions/types';
import { datetimeFormattingDB } from '../../utils/helper';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    display: 'flex',
    flexDirection: 'column',
    maxWidth: theme.breakpoints.values.sm,
  },
}));

const ChangePassword = ({
  intl: { formatMessage },
  changePassword,
  setError,
  auth,
}) => {
  const classes = useStyles();

  const [data, setData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [currentPasswordError, setCurrentPasswordError] = useState({
    error: false,
    message: '',
  });
  const [newPasswordError, setNewPasswordError] = useState({
    error: false,
    message: '',
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    error: false,
    message: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // Reset Redux error
    setError(false, '', '', CHANGE_PASSWORD);
  };

  const currentPasswordValidation = () => {
    if (isEmpty(data.currentPassword)) {
      setCurrentPasswordError({
        error: true,
        message: formatMessage({ id: 'error.currentPassword.required' }),
      });
      return false;
    }
    setCurrentPasswordError({
      error: false,
      message: '',
    });
    return true;
  };
  const newPasswordValidation = () => {
    if (isEmpty(data.newPassword)) {
      setNewPasswordError({
        error: true,
        message: formatMessage({ id: 'error.newPassword.required' }),
      });
      return false;
    }
    setNewPasswordError({
      error: false,
      message: '',
    });
    return true;
  };
  const confirmPasswordValidation = () => {
    if (isEmpty(data.confirmPassword)) {
      setConfirmPasswordError({
        error: true,
        message: formatMessage({ id: 'error.confirmPassword.required' }),
      });
      return false;
    }
    if (data.confirmPassword !== data.newPassword) {
      setConfirmPasswordError({
        error: true,
        message: formatMessage({ id: 'error.confirmPassword.invalid' }),
      });
      return false;
    }
    setConfirmPasswordError({
      error: false,
      message: '',
    });
    return true;
  };

  const inputsValidation = () => {
    const currentPasswordValid = currentPasswordValidation();
    const newPasswordValid = newPasswordValidation();
    const confirmPasswordValid = confirmPasswordValidation();
    return currentPasswordValid && newPasswordValid && confirmPasswordValid;
  };

  const onSubmit = () => {
    if (inputsValidation()) {
      changePassword(
        {
          loginId: auth.currentUser.login.loginId,
          oldPassword: data.currentPassword,
          newPassword: data.newPassword,
          updatePassword: datetimeFormattingDB(moment()),
        },
        () => setData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }),
      );
    }
  };

  const keyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <form className={classes.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        autoFocus
        required
        fullWidth
        name="currentPassword"
        label={formatMessage({ id: 'settings.changePassword.currentPassword' })}
        type={showPassword.currentPassword ? 'text' : 'password'}
        id="currentPassword"
        autoComplete="current-password"
        value={data.currentPassword}
        onChange={(e) => {
          setCurrentPasswordError({ error: false, message: '' });
          handleChange(e);
        }}
        error={currentPasswordError.error}
        helperText={currentPasswordError.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword({
                    ...showPassword,
                    currentPassword: !showPassword.currentPassword,
                  })
                }
              >
                {showPassword.currentPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="newPassword"
        label={formatMessage({ id: 'settings.changePassword.newPassword' })}
        type={showPassword.newPassword ? 'text' : 'password'}
        id="newPassword"
        autoComplete="current-password"
        value={data.newPassword}
        onChange={(e) => {
          setNewPasswordError({ error: false, message: '' });
          handleChange(e);
        }}
        error={newPasswordError.error}
        helperText={newPasswordError.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword({
                    ...showPassword,
                    newPassword: !showPassword.newPassword,
                  })
                }
              >
                {showPassword.newPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label={formatMessage({ id: 'settings.changePassword.confirmPassword' })}
        type={showPassword.confirmPassword ? 'text' : 'password'}
        id="confirmPassword"
        autoComplete="current-password"
        value={data.confirmPassword}
        onChange={(e) => {
          setConfirmPasswordError({ error: false, message: '' });
          handleChange(e);
        }}
        error={confirmPasswordError.error}
        helperText={confirmPasswordError.message}
        onKeyPress={keyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword({
                    ...showPassword,
                    confirmPassword: !showPassword.confirmPassword,
                  })
                }
              >
                {showPassword.confirmPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {auth.errors[CHANGE_PASSWORD]
      && auth.errors[CHANGE_PASSWORD].hasFailed ? (
        <Typography color="error" variant="body1">
          {auth.errors[CHANGE_PASSWORD].message}
        </Typography>
        ) : null}
      <MyDefaultButton
        className={classes.submit}
        onClick={onSubmit}
        disabled={auth.loadings[CHANGE_PASSWORD]}
      >
        {auth.loadings[CHANGE_PASSWORD] ? (
          <MyCircularProgress />
        ) : (
          <FormattedMessage id="settings.changePassword.savePassword" />
        )}
      </MyDefaultButton>
      <Link component={RouterLink} to="/forgotpassword" variant="body2">
        <FormattedMessage id="login.forgotPassword" />
      </Link>
    </form>
  );
};

ChangePassword.propTypes = {
  intl: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  changePassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { changePassword, setError },
)(injectIntl(ChangePassword));
