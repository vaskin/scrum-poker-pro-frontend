import { css } from '@chakra-ui/react';

export const wrapper = css({
  alignItems: 'center',
  flexDirection: 'column',
  borderTop: '2px solid #BFBFBF',
  bg: '#fff',
  width: '100%',
});

export const cards = {
  overflow: 'hidden',
  px: '50px',
  pt: {
    sm: 0,
    md: '20px',
  },
};

export const buttonWrapper = {
  width: {
    sm: '205px',
    md: '250px',
  },
  mb: '-25px',
  transform: 'translateY(-50%)',
};

export const buttonWrapperSmall = {
  width: {
    sm: '94px',
    md: '140px',
  },
  mr: '10px',
  transform: 'translateY(-50%)',
  mb: '-25px',
};
