import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { BsQuestion } from 'react-icons/bs';

import * as styles from './styles';

export const QuestionModal = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        css={styles.button}
        aria-label={'question'}
        icon={<BsQuestion color={'white'} size={'24px'} />}
      />
      <Modal isCentered onClose={handleClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent sx={styles.modalContent}>
          <ModalHeader css={styles.modalHeader}>{title}</ModalHeader>
          <ModalCloseButton css={styles.modalCloseButton} />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

QuestionModal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
