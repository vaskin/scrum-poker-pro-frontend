import {
  Button,
  Flex,
  Modal as CModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

export const ConfirmModal = ({
  onConfirm,
  isOpen,
  onClose,
  isLoading,
  children,
  ...otherProps
}) => {
  return (
    <>
      <CModal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent {...otherProps} borderRadius={'16px'}>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Flex justifyContent={'flex-end'}>
              <Button variant='ghost' onClick={onClose} isDisabled={isLoading}>
                No
              </Button>
              <Button
                isLoading={isLoading}
                ml={'10px'}
                onClick={onConfirm}
                colorScheme='red'
                variant='ghost'
              >
                Yes
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </CModal>
    </>
  );
};

ConfirmModal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
