import { css } from '@chakra-ui/react';

export const textarea = css({
  fontSize: '18px',
  padding: '16px',
  paddingY: '24px',
  '&': {
    _focus: {
      padding: '15px',
      paddingY: '23px',
      border: '2px solid #FD7E50',
    },
  },
});

export const textareaPlaceholder = css((isActive) => ({
  fontWeight: 'bold',
  color: 'rgba(17, 17, 17, 0.32)',
  transition: 'all .1s linear',
  pointerEvents: 'none',
  left: 16,
  right: 16,
  paddingTop: '3px',
  position: 'absolute',
  top: isActive ? '13px' : '23px',
  zIndex: '2',
  transform: 'translateY(-50%)',
  backgroundColor: '#fafafa',
  width: 'calc(100% - 32px)',
}));

export const errorText = css({
  mt: '4px',
  fontWeight: 'bold',
  color: 'red',
  fontSize: '14px !important',
});
