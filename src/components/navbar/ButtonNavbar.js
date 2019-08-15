import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  default: {
    textTransform: 'none',
    color: 'white',
    '&:hover': {
      margin: '-0.05rem',
      borderBottom: `solid 0.05rem ${theme.palette.primary.main}`,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  selected: {
    margin: '-0.05rem',
    borderBottom: `solid 0.05rem ${theme.palette.primary.main}`,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}));

const ButtonNavbar = ({
  label, selected, to,
}) => {
  const classes = useStyles();

  return (
    <>
      <Button
        className={clsx(classes.default, selected && classes.selected)}
        to={to}
        component={to ? Link : null}>
        {label}
      </Button>
    </>
  );
};

ButtonNavbar.propTypes = {
  label: PropTypes.string,
  selected: PropTypes.bool,
  to: PropTypes.string,
};

export default ButtonNavbar;
