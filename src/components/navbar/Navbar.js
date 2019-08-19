import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar, Toolbar, Hidden, IconButton, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { logoutUser } from '../../actions/authActions';

import logo from '../../images/logo.png';
import DrawerNavbar from './DrawerNavbar';
import TabsNavbar from './TabsNavbar';
import DialogConfirmation from '../common/DialogConfirmation';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    padding: '0 20px',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    paddingRight: 24,
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    marginLeft: 10,
    flexGrow: 1,
    fontWeight: 600,
    paddingRight: 20,
  },
  logoContainer: {
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'noWrap',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      borderRight: `0.05em solid ${theme.palette.primary.main}`,
    },
  },
  tabsContainer: {
    display: 'flex',
    width: '100%',
    margin: '0 0 0 30px',
  },
}));

const Navbar = ({ logoutUser, intl: { formatMessage } }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const toggleDrawer = (open) => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position='sticky'
        className={classes.appBar}
        color='secondary'
        square
        elevation={1}>
        <Toolbar className={classes.toolbar}>
          <Hidden mdUp>
            <IconButton
              edge='start'
              color='inherit'
              onClick={toggleDrawer(true)}
              className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Link to='/' className={classes.logoContainer}>
            <img src={logo} alt="Logo" height={40} width={43} />
            <Typography component="h1" variant="h6" color="primary" noWrap className={classes.title}>
              <FormattedMessage id='navbar.title' />
            </Typography>
          </Link>
          <div className={classes.tabsContainer}>
            <TabsNavbar
              onLogout={() => setLogoutDialogOpen(true)} />
          </div>
        </Toolbar>
      </AppBar>
      <DrawerNavbar
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onLogout={() => setLogoutDialogOpen(true)} />
      <DialogConfirmation
        handleCancel={() => setLogoutDialogOpen(false)}
        handleConfirm={() => { logoutUser(); setLogoutDialogOpen(false); }}
        dialogOpen={logoutDialogOpen}
        title={formatMessage({ id: 'drawer.dialog.logout.title' })}
        textContent={formatMessage({ id: 'drawer.dialog.logout.text' })}
      />
    </div >
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser },
)(injectIntl(Navbar));
