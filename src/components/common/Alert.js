import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { removeAlert } from '../../actions/alertAction';
import MySnackbarContent from './MySnackbarContent';

const Alert = ({ alerts, removeAlert }) => {
  const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    removeAlert(alerts.id);
  };

  if (alerts !== null && alerts.length > 0) {
    return (
      // Display all the alert contained in Redux store
      alerts.map((alert) => (
        <Snackbar
          key={alert.id}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={true}
          onClose={handleCloseAlert}
        >
          <MySnackbarContent
            onClose={handleCloseAlert}
            variant={alert.alertType}
            message={alert.msg}
          />
        </Snackbar>
      ))
    );
  }
  return null;
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(Alert);
