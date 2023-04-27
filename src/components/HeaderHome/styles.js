import { css } from '@chakra-ui/react';

export const popover = css({
  px: '16px',
  pt: '6px',
  pb: '13px',
  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))',
  maxWidth: '200px',
  width: '100%',
  border: '1px solid #B8B8B8',
  bg: '#fff',
});

export const popoverItem = css({
  _active: { opacity: '.5' },
  alignItems: 'center',
  cursor: 'pointer',
  mb: '14px',
});

export const popoverText = css({
  lineHeight: '150%',
  ml: '12px',
  opacity: '0.75',
  _hover: {
    color: '#FD7E50',
    opacity: '1',
  },
});

export const name = css({
  fontSize: '16px',
  fontWeight: 'bold',
  mr: '32px',
});

export const editPen = css({
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  opacity: 0,
  bg: 'rgba(0,0,0,.3)',
  borderRadius: '50%',
  _hover: {
    opacity: '1',
  },
});

export const editProfile = css({
  pt: '18px',
  pb: '24px',
  maxWidth: '485px',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
});
