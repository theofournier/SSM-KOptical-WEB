import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const DialogConfirmation = ({
  handleCancel, handleConfirm, dialogOpen, title, textContent, maxWidth,
}) => {
  return (
    <Dialog
      open={dialogOpen}
      onClose={handleCancel}
      fullWidth
      maxWidth={maxWidth || 'xs'}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {textContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          <FormattedMessage id='dialog.cancel' />
        </Button>
        <Button onClick={handleConfirm} variant='contained' color="primary" autoFocus>
          <FormattedMessage id='dialog.confirm' />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogConfirmation.propTypes = {
  handleCancel: PropTypes.func,
  handleConfirm: PropTypes.func,
  dialogOpen: PropTypes.bool,
  title: PropTypes.string,
  textContent: PropTypes.string,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

export default DialogConfirmation;
