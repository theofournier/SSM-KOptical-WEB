import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Popper, Grow, Paper, ClickAwayListener,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid rgba(0, 0, 0, 0.6)',
    borderRadius: 0,
  },
}));

const MenuNavbar = ({
  anchorEl, children, menuOpen, handleClose,
}) => {
  const classes = useStyles();
  return (
    <Popper open={menuOpen} anchorEl={anchorEl} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper elevation={0} className={classes.paper}>
            <ClickAwayListener onClickAway={handleClose}>
              {children}
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

MenuNavbar.propTypes = {
  anchorEl: PropTypes.object,
  children: PropTypes.object,
  menuOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default MenuNavbar;
