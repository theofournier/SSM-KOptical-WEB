import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { makeStyles } from '@material-ui/styles';
import {
  Container, Typography, Paper, Grid, Divider,
} from '@material-ui/core';
import SettingsOutlined from '@material-ui/icons/SettingsOutlined';
import ItemSettings from './ItemSettings';
import ChangePassword from './ChangePassword';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 600,
  },
  settingsIcon: {
    margin: theme.spacing(1),
    width: 35,
    height: 35,
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
  },
}));

const Settings = ({ intl: { formatMessage, formatDate, formatTime }, auth: { currentUser } }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth='md'>
      <div className={classes.titleContainer}>
        <SettingsOutlined className={classes.settingsIcon} color='primary' />
        <Typography className={classes.title} variant="h4" >
          <FormattedMessage id='settings.title' />
        </Typography>
      </div>
      <Paper className={classes.paper}>
        <Grid container spacing={2} direction='column'>
          <Grid item>
            <ItemSettings
              title={formatMessage({ id: 'settings.changePassword.title' })}
              text={currentUser.login && currentUser.login.updatePassword
                ? `${formatMessage({ id: 'settings.changePassword.text' })} ${currentUser.login ? `${formatDate(currentUser.login.updatePassword)} ${formatTime(currentUser.login.updatePassword)}` : ''}`
                : ''}>
              <ChangePassword />
            </ItemSettings>
          </Grid>
          <Grid item>
            <Divider variant="fullWidth" />
          </Grid>
          <Grid item>
            <ItemSettings
              title='Email Address'
              text='Change your email thanks your old email'>
              Change Email
            </ItemSettings>
          </Grid>
        </Grid>
      </Paper>
    </Container >
  );
};

Settings.propTypes = {
  intl: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
)(injectIntl(Settings));
