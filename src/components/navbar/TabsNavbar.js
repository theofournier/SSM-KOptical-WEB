import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Hidden, IconButton, Grid,
} from '@material-ui/core';
import { injectIntl, FormattedMessage } from 'react-intl';
import FaceOutlined from '@material-ui/icons/FaceOutlined';
import MailOutlined from '@material-ui/icons/MailOutlined';

import ButtonNavbar from './ButtonNavbar';
import MyDefaultButton from '../common/MyDefaultButton';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  },
}));

const TabsNavbar = ({
  location: { pathname }, intl: { formatMessage }, auth: { isAuthenticated },
}) => {
  const classes = useStyles();

  const tabsNoAuth = (
    <div className={classes.loginContainer}>
      <Hidden xsDown>
        <MyDefaultButton to='/login' component={Link} variant='default2'>
          <FormattedMessage id='navbar.login' />
        </MyDefaultButton>
      </Hidden>
    </div>
  );

  const tabsAuth = (
    <div className={classes.mainContainer}>
      <div>
        <Hidden smDown>
          <Grid container spacing={1}>
            <Grid item>
              <ButtonNavbar
                selected={pathname === '/customers'}
                label={formatMessage({ id: 'navbar.customers' })}
                to='/customers' />
            </Grid>
            <Grid item>
              <ButtonNavbar
                selected={pathname === '/calendar'}
                label={formatMessage({ id: 'navbar.calendar' })}
                to='/calendar' />
            </Grid>
            <Grid item>
              <ButtonNavbar
                selected={pathname === '/dashboard'}
                label={formatMessage({ id: 'navbar.dashboard' })}
                to='/dashboard' />
            </Grid>
            <Grid item>
              <ButtonNavbar
                selected={pathname === '/meetingnote'}
                label={formatMessage({ id: 'navbar.meetingnote' })}
                to='/meetingnote' />
            </Grid>
            <Grid item>
              <ButtonNavbar
                selected={pathname === '/adminpanel'}
                label={formatMessage({ id: 'navbar.adminpanel' })}
                to='/adminpanel' />
            </Grid>
          </Grid>
        </Hidden>
      </div>
      <div>
        <Hidden xsDown>
          <IconButton
            color={pathname === '/messages' ? 'primary' : 'inherit'}
            component={Link}
            to='/messages'>
            <MailOutlined />
          </IconButton>
          <IconButton
            color={pathname === '/account' ? 'primary' : 'inherit'}
            component={Link}
            to='/account'>
            <FaceOutlined />
          </IconButton>
        </Hidden>
      </div>
    </div>
  );

  return (
    <>
      {isAuthenticated
        ? tabsAuth
        : tabsNoAuth}
    </>
  );
};

TabsNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
)(withRouter(injectIntl(TabsNavbar)));
