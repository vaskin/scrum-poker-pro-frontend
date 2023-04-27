import {
  Box,
  Popover as CPopover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

export const Popover = ({
  popoverHeader = null,
  component,
  children,
  onClose,
  onOpen,
  isOpen,
  placement = 'bottom-end',
  ...otherProps
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleOpen = () => {
    if (onOpen) {
      onOpen();
    }
  };

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <CPopover
        isOpen={isOpen}
        onClose={handleClose}
        onOpen={handleOpen}
        placement={placement}
      >
        <PopoverTrigger>
          <Box width={'100%'} as={'button'} cursor={'pointer'}>
            {component}
          </Box>
        </PopoverTrigger>
        <PopoverContent bg={'#fff'} {...otherProps}>
          {popoverHeader ? (
            <PopoverHeader>{popoverHeader}</PopoverHeader>
          ) : null}
          <PopoverBody>{children}</PopoverBody>
        </PopoverContent>
      </CPopover>
    </Box>
  );
};

Popover.propTypes = {
  component: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  popoverHeader: PropTypes.node,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  placement: PropTypes.string,
};
