import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import MyDefaultButton from '../common/MyDefaultButton';
import logo from '../../images/logo_name.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    margin: '100px auto 0',
    textAlign: 'center',
  },
  titleContainer: {
    margin: '0 0 80px 0',
  },
  logoContainer: {
    margin: '0 0 20px 0',
  },
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={classes.buttonContainer}>
        <MyDefaultButton to='/login' component={Link} variant='default2'>
          <FormattedMessage id='landing.login' />
        </MyDefaultButton>
      </div>
    </div>
  );
};
export default Landing;
