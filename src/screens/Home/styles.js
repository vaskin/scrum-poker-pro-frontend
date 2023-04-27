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
});

export const name = css({
  fontSize: '16px',
  fontWeight: 'bold',
  mr: '32px',
});

export const createCard = css({
  cursor: 'pointer',
  minHeight: '240px',
  _active: {
    opacity: '.5',
  },
  border: '2px dashed rgba(253, 126, 80, 0.32)',
  borderRadius: '16px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const createCardText = css({
  fontWeight: 'bold',
  fontSize: '16px',
  mt: '18px',
});

export const meetingCard = {
  bg: '#fff',
  borderRadius: '16px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
  width: '100%',
};

export const cardContent = css({
  px: '8px',
  py: '4px',
  bg: '#fff',
  borderRadius: '100px',
  position: 'absolute',
  left: '12px',
  top: '12px',
});

export const remove = css({
  cursor: 'pointer',
  _active: {
    opacity: '.5',
  },
});

export const cardContentBottom = css({
  px: '16px',
  pb: '16px',
  justifyContent: 'space-between',
});

export const imageCardText = css({
  fontWeight: 'bold',
  color: '#FD8458',
});

export const wrapper = css({
  pb: '64px',
  justifyContent: 'space-between',
  flexDirection: 'column',
  minHeight: '100vh',
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
  pt: '25px',
  pb: '32px',
  maxWidth: '485px',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
});
