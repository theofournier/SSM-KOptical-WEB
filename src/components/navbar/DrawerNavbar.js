import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Drawer, List, Divider, ListSubheader, Typography, Hidden,
} from '@material-ui/core';
import { injectIntl, FormattedMessage } from 'react-intl';
import ListOutlined from '@material-ui/icons/ListOutlined';
import MapOutlined from '@material-ui/icons/MapOutlined';
import CalendarTodayOutlined from '@material-ui/icons/CalendarTodayOutlined';
import AssessmentOutlined from '@material-ui/icons/AssessmentOutlined';
import NotesOutlined from '@material-ui/icons/NotesOutlined';
import SupervisedUserCircleOutlined from '@material-ui/icons/SupervisedUserCircleOutlined';
import GroupOutlined from '@material-ui/icons/GroupOutlined';
import TrendingUpOutlined from '@material-ui/icons/TrendingUpOutlined';
import MessageOutlined from '@material-ui/icons/MessageOutlined';
import MailOutlined from '@material-ui/icons/MailOutlined';
import FaceOutlined from '@material-ui/icons/FaceOutlined';
import PowerSettingsNewOutlined from '@material-ui/icons/PowerSettingsNewOutlined';

import ListItemDrawer from '../common/ListItemDrawer';
import logo from '../../images/logo_name.png';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: theme.drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  logoLink: {
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    margin: '10px 0 15px',
    justifyContent: 'center',
  },
}));

const DrawerNavbar = ({
  open, onClose, location: { pathname }, intl: { formatMessage },
}) => {
  const classes = useStyles();

  const drawerItemsAuth = (
    <>
      <Hidden smUp>
        <List>
          <ListItemDrawer
            label={formatMessage({ id: 'drawer.account' })}
            selected={pathname === '/account'}
            to='/account'
            Icon={<FaceOutlined />}
            onClick={onClose} />
          <ListItemDrawer
            label={formatMessage({ id: 'drawer.logout' })}
            Icon={<PowerSettingsNewOutlined />}
            onClick={onClose} />
        </List>
        <Divider variant='middle' />
      </Hidden>
      <List>
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.customers' })}
          selected={pathname === '/customers'}
          to='/customers'
          Icon={<ListOutlined />}
          onClick={onClose} />
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.customersMap' })}
          selected={pathname === '/customersmap'}
          to='/customersmap'
          Icon={<MapOutlined />}
          onClick={onClose} />
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.calendar' })}
          selected={pathname === '/calendar'}
          to='/calendar'
          Icon={<CalendarTodayOutlined />}
          onClick={onClose} />
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.dashboard' })}
          selected={pathname === '/dashboard'}
          to='/dashboard'
          Icon={<AssessmentOutlined />}
          onClick={onClose} />
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.meetingNote' })}
          selected={pathname === '/meetingnote'}
          to='/meetingnote'
          Icon={<NotesOutlined />}
          onClick={onClose} />
        <Hidden smUp>
          <ListItemDrawer
            label={formatMessage({ id: 'drawer.messages' })}
            selected={pathname === '/messages'}
            to='/messages'
            Icon={<MailOutlined />}
            onClick={onClose} />
        </Hidden>
      </List>
      <Divider variant='middle' />
      <List>
        <ListSubheader><FormattedMessage id='drawer.adminTitle' /></ListSubheader>
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.adminPanel' })}
          selected={pathname === '/adminpanel'}
          to='/adminpanel'
          Icon={<SupervisedUserCircleOutlined />}
          onClick={onClose} />
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.users' })}
          selected={pathname === '/users'}
          to='/users'
          Icon={<GroupOutlined />}
          onClick={onClose} />
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.targets' })}
          selected={pathname === '/targets'}
          to='/targets'
          Icon={<TrendingUpOutlined />}
          onClick={onClose} />
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.sendmessage' })}
          selected={pathname === '/sendmessage'}
          to='/sendmessage'
          Icon={<MessageOutlined />}
          onClick={onClose} />
      </List>
    </>
  );

  const drawerItemsNoAuth = (
    <Hidden smUp>
      <List>
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.login' })}
          selected={pathname === '/login'}
          to='/login'
          Icon={<PowerSettingsNewOutlined />}
          onClick={onClose} />
      </List>
    </Hidden>
  );

  return (
    <Drawer
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
      onClose={onClose}
    >
      <List>
        <Link to='/' className={classes.logoLink} onClick={onClose}>
          <img src={logo} alt="Logo" height={43} width={100} />
        </Link>
        <Divider variant='middle' />
        {drawerItemsNoAuth}
      </List>
    </Drawer>
  );
};

export default withRouter(injectIntl(DrawerNavbar));
