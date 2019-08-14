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
  selected, to, label, Icon,
}) => {
  const classes = useStyles();

  return (
    <ListItem
      button
      to={to}
      component={Link}
      selected={selected === to}
      classes={{ selected: classes.selected }}
    >
      <ListItemIcon>
        {React.cloneElement(Icon, {
          className: selected === to ? classes.iconSelected : '',
        })}
      </ListItemIcon>
      <ListItemText
        primary={label}
        classes={
          selected === to
            ? { primary: classes.itemTextSelected }
            : {}
        }
      />
    </ListItem>
  );
};

ListItemDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.string,
  selectedLabel: PropTypes.string,
  to: PropTypes.string,
  label: PropTypes.string,
};

export default ListItemDrawer;
