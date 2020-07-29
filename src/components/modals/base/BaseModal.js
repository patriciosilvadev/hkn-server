import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const BaseModal = ({ title, contentText, open, handleClose, children }) => {
  const handleOnClickClose = onClickFunc => {
    handleClose();

    if (onClickFunc != null) {
      onClickFunc();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>

      <DialogActions>
        {children(onClickFunc => handleOnClickClose(onClickFunc))}
      </DialogActions>
    </Dialog>
  );
};

BaseModal.propTypes = {
  title: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.func,
};

BaseModal.defaultProps = {
  children: () => {},
};

export default BaseModal;
