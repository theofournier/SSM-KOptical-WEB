import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  iconSelected: {
    color: theme.palette.primary.main,
  },
  itemTextSelected: {
    color: theme.palette.primary.main,
  },
  selected: {
    backgroundColor: 'white !important',
  },
}));

const ListItemDrawer = ({
  selected, to, label, Icon, onClick,
}) => {
  const classes = useStyles();

  return (
    <ListItem
      button
      to={to}
      component={to ? Link : null}
      selected={selected}
      classes={{ selected: classes.selected }}
      onClick={onClick}
    >
      <ListItemIcon>
        {React.cloneElement(Icon, {
          className: selected ? classes.iconSelected : '',
        })}
      </ListItemIcon>
      <ListItemText
        primary={label}
        classes={
          selected
            ? { primary: classes.itemTextSelected }
            : {}
        }
      />
    </ListItem>
  );
};

ListItemDrawer.propTypes = {
  selected: PropTypes.bool,
  to: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default ListItemDrawer;
