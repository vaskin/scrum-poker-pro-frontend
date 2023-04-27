import { css } from '@chakra-ui/react';

export const button = css({
  position: 'fixed',
  right: '25px',
  bottom: '25px',
  width: '48px',
  height: '48px !important',
  borderRadius: '50%',
});

export const modalContent = {
  maxWidth: '1056px',
  width: {
    sm: '90%',
  },
  border: '2px solid #BFBFBF',
  pb: 5,
  borderRadius: '16px',
};

export const modalHeader = css({
  borderBottom: '2px solid #BFBFBF',
  color: 'black',
  fontSize: '23px',
});

export const modalCloseButton = css({
  width: '24px',
  height: '24px',
  opacity: '.32',
  top: '22px',
});
