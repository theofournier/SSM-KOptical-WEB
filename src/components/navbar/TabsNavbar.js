import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Hidden, IconButton, Grid,
} from '@material-ui/core';
import { injectIntl } from 'react-intl';
import FaceOutlined from '@material-ui/icons/FaceOutlined';
import MailOutlined from '@material-ui/icons/MailOutlined';
import ButtonNavbar from './ButtonNavbar';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const TabsNavbar = ({
  location: { pathname }, intl: { formatMessage },
}) => {
  const classes = useStyles();

  const tabsNoAuth = (
    null
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
            color='inherit'>
            <MailOutlined />
          </IconButton>
          <IconButton
            color='inherit'>
            <FaceOutlined />
          </IconButton>
        </Hidden>
      </div>
    </div>
  );

  return (
    <>
      {tabsAuth}
    </>
  );
};

export default withRouter(injectIntl(TabsNavbar));
