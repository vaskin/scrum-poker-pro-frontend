import { css } from '@chakra-ui/react';

export const card = ({ active, voted }) => ({
  background: active ? '#F0ECE8' : voted ? '#F0ECE8' : 'transparent',
  border: `1px solid ${
    active || voted ? 'rgba(253, 126, 80, 0.32)' : 'transparent'
  } `,
  boxShadow: active ? '0px 4px 8px rgba(0, 0, 0, 0.05)' : 'none',
  borderRadius: '4.58922px',
  p: active || voted ? '4px' : '0',
  mx: 'auto',
  width: {
    sm: '70px',
    lg: '86px',
  },
});

export const content = css(({ active, voted }) => ({
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: voted ? 'space-between' : 'center',
  pt: voted ? '3px' : '21px',
  bg: active ? '#FD7E50' : voted ? '#fff' : 'transparent',
  borderRadius: '4.58922px',
  height: '133px',
  position: 'relative',
  pb: '14px',
}));

export const avatar = css({
  mb: '8px',
  border: '3px solid #FD7E50',
  width: '50px',
  height: '50px',
});

export const label = {
  justifyContent: 'center',
  alignItems: 'center',
  bg: '#71357C',
  width: '52px',
  height: '20px',
  lineHeight: '1',
  transform: {
    sm: 'translate(-50%, 150%)',
    lg: 'translate(-50%, 50%)',
  },
  position: 'absolute',
  left: '50%',
  bottom: '0',
};

export const name = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  mb: '5px',
};
