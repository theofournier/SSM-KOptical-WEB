import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  base: {
    borderRadius: 0,
    fontWeight: 600,
    transition: 'all 0.5s ease',
    borderWidth: '0.1rem',
  },
  default: {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
  default2: {
    '&:hover': {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },
  },
  accept: {
    borderColor: theme.palette.button.accept,
    color: theme.palette.button.accept,
    '&:hover': {
      backgroundColor: theme.palette.button.accept,
      color: 'white',
    },
  },
  cancel: {
    borderColor: theme.palette.button.delete,
    color: theme.palette.button.delete,
    '&:hover': {
      backgroundColor: theme.palette.button.delete,
      color: 'white',
    },
  },
}));

const MyDefaultButton = ({
  className, onClick, to, component, variant, disabled, ...props
}) => {
  const classes = useStyles();

  // Get the style depending on the variant
  const classVariant = variant ? classes[variant] : classes.default;

  return (
    <Button
      color='inherit'
      className={clsx(classes.base, classVariant, className)}
      variant="outlined"
      onClick={onClick}
      to={to}
      component={component}
      disabled={disabled || false}
    >
      {props.children}
    </Button>
  );
};

MyDefaultButton.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  component: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'default2', 'accept', 'cancel']),
  disabled: PropTypes.bool,
};

export default MyDefaultButton;
