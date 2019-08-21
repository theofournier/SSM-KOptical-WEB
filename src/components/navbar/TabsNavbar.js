import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Hidden, IconButton, Grid, MenuList, Divider,
} from '@material-ui/core';
import { injectIntl, FormattedMessage } from 'react-intl';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import MailOutlined from '@material-ui/icons/MailOutlined';
import FaceOutlined from '@material-ui/icons/FaceOutlined';
import PowerSettingsNewOutlined from '@material-ui/icons/PowerSettingsNewOutlined';
import SupervisedUserCircleOutlined from '@material-ui/icons/SupervisedUserCircleOutlined';
import GroupOutlined from '@material-ui/icons/GroupOutlined';
import TrendingUpOutlined from '@material-ui/icons/TrendingUpOutlined';
import MessageOutlined from '@material-ui/icons/MessageOutlined';
import ListOutlined from '@material-ui/icons/ListOutlined';
import MapOutlined from '@material-ui/icons/MapOutlined';

import ButtonNavbar from './ButtonNavbar';
import MyDefaultButton from '../common/MyDefaultButton';
import MenuNavbar from './MenuNavabar';
import MenuItemNavbar from './MenuItemNavbar';

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
  onLogout, location: { pathname }, intl: { formatMessage }, auth: { isAuthenticated, currentUser },
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuList, setMenuList] = useState(null);
  const menuOpen = Boolean(anchorEl);

  function handleMenuOpen(e) {
    setAnchorEl(e.currentTarget);
    e.preventDefault();
  }

  function handleMenuClose(e) {
    setAnchorEl(null);
  }

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
                selected={['/customers', '/customersmap'].includes(pathname)}
                label={formatMessage({ id: 'navbar.customers' })}
                onClick={(e) => { setMenuList(customerMenuList); handleMenuOpen(e); }} />
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
                selected={['/adminpanel', '/users', '/targets', '/sendmessage'].includes(pathname)}
                label={formatMessage({ id: 'navbar.adminPanel' })}
                onClick={(e) => { setMenuList(adminMenuList); handleMenuOpen(e); }} />
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
            onClick={(e) => { setMenuList(accountMenuList); handleMenuOpen(e); }}
            color={pathname === '/account' ? 'primary' : 'inherit'}>
            <AccountCircleOutlined />
          </IconButton>
        </Hidden>
      </div>
    </div>
  );

  const accountMenuList = (
    <MenuList>
      <MenuItemNavbar
        to='/account'
        onClick={handleMenuClose}
        selected={pathname === '/account'}
        Icon={<FaceOutlined />}
        primaryLabel={`${currentUser.firstName} ${currentUser.lastName}`}
        secondaryLabel={`${currentUser.email}`} />
      <Divider />
      <MenuItemNavbar
        onClick={(e) => { handleMenuClose(); onLogout(); }}
        selected={false}
        Icon={<PowerSettingsNewOutlined />}
        primaryLabel={formatMessage({ id: 'navbar.logout' })} />
    </MenuList>
  );

  const adminMenuList = (
    <MenuList>
      <MenuItemNavbar
        to='/adminpanel'
        onClick={handleMenuClose}
        selected={pathname === '/adminpanel'}
        Icon={<SupervisedUserCircleOutlined />}
        primaryLabel={formatMessage({ id: 'navbar.adminPanel.adminPanel' })} />
      <Divider />
      <MenuItemNavbar
        to='/users'
        onClick={handleMenuClose}
        selected={pathname === '/users'}
        Icon={<GroupOutlined />}
        primaryLabel={formatMessage({ id: 'navbar.adminPanel.users' })} />
      <Divider />
      <MenuItemNavbar
        to='/targets'
        onClick={handleMenuClose}
        selected={pathname === '/targets'}
        Icon={<TrendingUpOutlined />}
        primaryLabel={formatMessage({ id: 'navbar.adminPanel.targets' })} />
      <Divider />
      <MenuItemNavbar
        to='/sendmessage'
        onClick={handleMenuClose}
        selected={pathname === '/sendmessage'}
        Icon={<MessageOutlined />}
        primaryLabel={formatMessage({ id: 'navbar.adminPanel.sendMessage' })} />
    </MenuList>
  );

  const customerMenuList = (
    <MenuList>
      <MenuItemNavbar
        to='/customers'
        onClick={handleMenuClose}
        selected={pathname === '/customers'}
        Icon={<ListOutlined />}
        primaryLabel={formatMessage({ id: 'navbar.customers.customers' })} />
      <Divider />
      <MenuItemNavbar
        to='/customersmap'
        onClick={handleMenuClose}
        selected={pathname === '/customersmap'}
        Icon={<MapOutlined />}
        primaryLabel={formatMessage({ id: 'navbar.customers.customersMap' })} />
    </MenuList>
  );

  return (
    <>
      {isAuthenticated
        ? tabsAuth
        : tabsNoAuth}
      <MenuNavbar
        anchorEl={anchorEl}
        menuOpen={menuOpen}
        handleClose={handleMenuClose}>
        {menuList}
      </MenuNavbar>
    </>
  );
};

TabsNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  onLogout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
)(withRouter(injectIntl(TabsNavbar)));
