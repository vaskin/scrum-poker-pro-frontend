import { css } from '@chakra-ui/react';

export const input = css({
  height: '56px',
  fontSize: '18px',
  pb: '6px',
  pt: '26px',
  pl: '16px',
  pr: '46px',
  color: 'black',
  bg: '#fff',
  fontWeight: 'bold',
  '&': {
    _focus: {
      border: '2px solid #FD7E50',
      pl: '15px',
      pr: '45px',
    },
  },
});

export const inputPlaceholder = css((isActive) => ({
  fontWeight: 'bold',
  color: 'rgba(17, 17, 17, 0.32)',
  transition: 'all .1s linear',
  pointerEvents: 'none',
  left: '16px',
  position: 'absolute',
  top: isActive ? '16px' : '50%',
  zIndex: '2',
  transform: 'translateY(-50%)',
}));

export const eye = css({
  cursor: 'pointer',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  right: '16px',
});

export const errorText = css({
  mt: '4px',
  fontWeight: 'bold',
  color: 'red',
  fontSize: '14px !important',
});
