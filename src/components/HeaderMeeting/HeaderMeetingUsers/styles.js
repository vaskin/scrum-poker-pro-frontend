import { css } from '@chakra-ui/react';

export const avatar = css({
  mr: '-30px',
  border: '3px solid #fff',
  width: '60px',
  height: '60px',
});

export const wrapper = css({
  alignItems: 'center',
  flexGrow: '1',
  justifyContent: 'flex-end',
});

export const sendButton = {
  width: '100%',
  mt: {
    sm: '10px',
    md: '0',
  },
  ml: {
    sm: '0',
    md: '16px',
  },
  maxWidth: {
    sm: '100%',
    md: '160px',
  },
  height: '56px',
};

export const cancleButton = {
  height: '60px',
  width: {
    sm: 'auto',
    md: '100%',
  },
  maxWidth: {
    sm: 'auto',
    md: '240px',
  },
  flexGrow: 1,
};

export const text = {
  _hover: {
    color: '#FD7E50',
    opacity: '1',
  },
  textAlign: 'left',
  width: '100%',
  opacity: '.4',
};
