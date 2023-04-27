import { css } from '@chakra-ui/react';

export const button = css({
  position: 'fixed',
  right: '25px',
  bottom: '25px',
  width: '48px',
  height: '48px',
  borderRadius: '50%',
});

export const modalContent = css({
  maxWidth: '1056px',
  border: '2px solid #BFBFBF',
  pb: 5,
  borderRadius: '16px',
});

export const modalHeader = (showBorder) => ({
  borderBottom: showBorder ? '2px solid #BFBFBF' : 'none',
  mx: '-2px',
  color: 'black',
  fontSize: {
    sm: '20px',
    md: '23px',
  },
});

export const modalCloseButton = css({
  width: '24px',
  height: '24px',
  opacity: '.32',
  top: '18px',
});
