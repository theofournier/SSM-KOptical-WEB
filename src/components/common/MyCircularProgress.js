import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  progress: {
    color: theme.palette.primary.main,
  },
}));

const MyCircularProgress = ({ className }) => {
  const classes = useStyles();

  return <CircularProgress className={clsx(classes.progress, className)} />;
};

export default MyCircularProgress;
