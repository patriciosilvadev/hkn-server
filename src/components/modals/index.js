import React from 'react';
import PropTypes from 'prop-types';

import Button from '../buttons';
import ButtonWithModal from './base/ButtonWithModal';

export const ConfirmationModalWithButton = ({
  title,
  contentText,
  openButtonProps,
  confirmButtonProps,
  cancelButtonProps,
}) => {
  const { name: cancelName, ...otherCancelProps } = cancelButtonProps;
  const {
    name: confirmName,
    onClick: confirmOnClick,
    ...otherConfirmProps
  } = confirmButtonProps;

  return (
    <ButtonWithModal
      title={title}
      contentText={contentText}
      openButtonProps={openButtonProps}
    >
      {onClickHOF => (
        <>
          <Button onClick={() => onClickHOF(null)} {...otherCancelProps}>
            {cancelName}
          </Button>

          <Button
            onClick={() => onClickHOF(confirmOnClick)}
            {...otherConfirmProps}
          >
            {confirmName}
          </Button>
        </>
      )}
    </ButtonWithModal>
  );
};

ConfirmationModalWithButton.propTypes = {
  title: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired,
  openButtonProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    otherProps: PropTypes.object,
  }),
  confirmButtonProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    otherConfirmProps: PropTypes.object,
  }),
  cancelButtonProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    otherCancelProps: PropTypes.object,
  }),
};

ConfirmationModalWithButton.defaultProps = {
  openButtonProps: {
    otherProps: {},
  },
  confirmButtonProps: {
    onClick: () => {},
    otherConfirmProps: {},
  },
  cancelButtonProps: {
    onClick: () => {},
    otherCancelProps: {},
  },
};

export const AlertModalWithButton = ({
  title,
  contentText,
  openButtonProps,
  closeButtonProps,
}) => {
  const { name, ...otherProps } = closeButtonProps;

  return (
    <ButtonWithModal
      title={title}
      contentText={contentText}
      openButtonProps={openButtonProps}
    >
      {onClickHOF => (
        <>
          <Button onClick={() => onClickHOF(null)} {...otherProps}>
            {name}
          </Button>
        </>
      )}
    </ButtonWithModal>
  );
};

AlertModalWithButton.propTypes = {
  title: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired,
  openButtonProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    otherProps: PropTypes.object,
  }),
  closeButtonProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    otherProps: PropTypes.object,
  }),
};

AlertModalWithButton.defaultProps = {
  openButtonProps: {
    otherProps: {},
  },
  closeButtonProps: {
    onClick: () => {},
    otherProps: {},
  },
};
