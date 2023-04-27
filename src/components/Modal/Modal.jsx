import {
  Modal as CModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import PropTypes, { node, string } from 'prop-types';
import React from 'react';

import * as styles from './styles';

export const Modal = ({
  title = null,
  isOpen,
  onClose,
  isButtonClose = false,
  children,
  showHeaderBorder = true,
  ...otherProps
}) => {
  return (
    <>
      <CModal
        scrollBehavior={'outside'}
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent
          width={{
            sm: '95%',
            md: '100%',
          }}
          {...otherProps}
          border={'2px solid #BFBFBF'}
          borderRadius={'16px'}
        >
          {title ? (
            <ModalHeader sx={styles.modalHeader(showHeaderBorder)}>
              {title}
            </ModalHeader>
          ) : null}
          {isButtonClose && <ModalCloseButton css={styles.modalCloseButton} />}
          <ModalBody
            px={{
              sm: '16px',
              md: '24px',
            }}
          >
            {children}
          </ModalBody>
        </ModalContent>
      </CModal>
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([string, node]),
  isButtonClose: PropTypes.bool,
  showHeaderBorder: PropTypes.bool,
};
