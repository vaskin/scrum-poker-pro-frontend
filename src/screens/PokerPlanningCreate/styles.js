import { css } from '@chakra-ui/react';

export const card = css((isActive) => ({
  cursor: 'pointer',
  borderRadius: '8px',
  pt: isActive ? '11px' : '12px',
  pb: isActive ? '17px' : '18px',
  px: isActive ? '12px' : '13px',
  color: '#2F323C',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
  border: isActive ? '2px solid #FD7E50' : '1px solid rgba(0, 0, 0, 0.32)',
  width: '129px',
  alignItems: 'center',
  flexDirection: 'column',
  bg: '#fff',
}));
