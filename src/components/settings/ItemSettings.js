import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Typography, IconButton, Collapse, Hidden,
} from '@material-ui/core';
import ExpandLessOutlined from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlined from '@material-ui/icons/ExpandMoreOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 600,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
  },
  children: {
    marginTop: theme.spacing(1),
  },
}));

const ItemSettings = ({ title, text, children }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.header} onClick={() => setOpen(!open)}>
        <div className={classes.textContainer}>
          <Typography className={classes.title} variant="h6" onClick={() => setOpen(!open)}>
            {title}
          </Typography>
          <Typography variant="body1">
            {text}
          </Typography>
        </div>
        <div className={classes.buttonContainer}>
          <Hidden xsDown>
            <IconButton onClick={() => setOpen(!open)}>
              {open
                ? <ExpandLessOutlined />
                : <ExpandMoreOutlined />}
            </IconButton>
          </Hidden>
        </div>
      </div>
      <Collapse in={open}>
        <div className={classes.children}>
          {children}
        </div>
      </Collapse>
    </div>
  );
};

ItemSettings.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default ItemSettings;
