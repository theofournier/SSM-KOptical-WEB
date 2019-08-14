import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Hidden, IconButton,
} from '@material-ui/core';
import { injectIntl } from 'react-intl';
import FaceOutlined from '@material-ui/icons/FaceOutlined';
import MailOutlined from '@material-ui/icons/MailOutlined';

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
      <div className={classes.tabsContainer}>
        <Hidden smDown>
          test
        </Hidden>
      </div>
      <div className={classes.iconsContainer}>
        <IconButton
          color='inherit'>
          <MailOutlined />
        </IconButton>
        <IconButton
          color='inherit'>
          <FaceOutlined />
        </IconButton>
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
