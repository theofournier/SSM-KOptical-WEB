import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Drawer, List, Divider, ListSubheader, Typography,
} from '@material-ui/core';
import { injectIntl, FormattedMessage } from 'react-intl';
import ListOutlined from '@material-ui/icons/ListOutlined';
import MapOutlined from '@material-ui/icons/MapOutlined';
import CalendarTodayOutlined from '@material-ui/icons/CalendarTodayOutlined';
import AssessmentOutlined from '@material-ui/icons/AssessmentOutlined';
import NotesOutlined from '@material-ui/icons/NotesOutlined';
import SupervisorAccountOutlined from '@material-ui/icons/SupervisorAccountOutlined';
import GroupOutlined from '@material-ui/icons/GroupOutlined';
import TrendingUpOutlined from '@material-ui/icons/TrendingUpOutlined';
import MessageOutlined from '@material-ui/icons/MessageOutlined';
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
    margin: '10px 0',
    justifyContent: 'center',
  },
}));

const DrawerNavbar = ({
  open, onClose, location: { pathname }, intl: { formatMessage },
}) => {
  const classes = useStyles();

  const drawerItems = (
    <>
      <Link to='/' className={classes.logoLink}>
        <img src={logo} alt="Logo" height={40} width={100} />
      </Link>
      <Divider variant='middle' />
      <List>
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.customers' })}
          selected={pathname}
          to='/customers'
          Icon={<ListOutlined />} />
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.customersMap' })}
          selected={pathname}
          to='/customersmap'
          Icon={<MapOutlined />} />
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.calendar' })}
          selected={pathname}
          to='/calendar'
          Icon={<CalendarTodayOutlined />} />
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.dashboard' })}
          selected={pathname}
          to='/dashboard'
          Icon={<AssessmentOutlined />} />
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.meetingNote' })}
          selected={pathname}
          to='/meetingnote'
          Icon={<NotesOutlined />} />
      </List>
      <Divider variant='middle' />
      <List>
        <ListSubheader><FormattedMessage id='drawer.adminTitle' /></ListSubheader>
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.adminPanel' })}
          selected={pathname}
          to='/adminpanel'
          Icon={<SupervisorAccountOutlined />} />
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.users' })}
          selected={pathname}
          to='/users'
          Icon={<GroupOutlined />} />
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.targets' })}
          selected={pathname}
          to='/targets'
          Icon={<TrendingUpOutlined />} />
        <ListItemDrawer
          label={formatMessage({ id: 'drawer.sendmessage' })}
          selected={pathname}
          to='/sendmessage'
          Icon={<MessageOutlined />} />
      </List>
    </>
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
        {drawerItems}
      </List>
    </Drawer>
  );
};

export default withRouter(injectIntl(DrawerNavbar));
