import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  MenuItem, ListItemIcon, ListItemText, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  iconSelected: {
    color: theme.palette.primary.main,
  },
}));

const MenuItemNavbar = ({
  to, onClick, selected, Icon, primaryLabel, secondaryLabel,
}) => {
  const classes = useStyles();
  return (
    <MenuItem
      to={to}
      component={to && Link}
      onClick={onClick}>
      <ListItemIcon>
        {React.cloneElement(Icon, {
          className: selected ? classes.iconSelected : '',
        })}
      </ListItemIcon>
      <ListItemText
        primary={primaryLabel}
        secondary={secondaryLabel}
        primaryTypographyProps={{ color: selected ? 'primary' : 'inherit' }} />
    </MenuItem>
  );
};

MenuItemNavbar.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  primaryLabel: PropTypes.string,
  secondaryLabel: PropTypes.string,
};

export default MenuItemNavbar;
