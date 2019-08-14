import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar, Toolbar, Hidden, IconButton, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FaceOutlined from '@material-ui/icons/FaceOutlined';

import logo from '../../images/logo.png';
import DrawerNavbar from './DrawerNavbar';
import TabsNavbar from './TabsNavbar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
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
    margin: '0 0 0 20px',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position='sticky'
        className={classes.appBar}
        color='secondary'
        square
        elevation={0}>
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
            <TabsNavbar />
          </div>
        </Toolbar>
      </AppBar>
      <DrawerNavbar
        open={open}
        onClose={toggleDrawer(false)} />
    </div>
  );
};

export default Navbar;
