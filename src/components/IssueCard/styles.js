import { css } from '@chakra-ui/react';

export const wrapper = css(({ isActive, isSelectedIssue }) => ({
  position: 'relative',
  border: `2px solid ${isActive ? '#FD7E50' : 'transparent'}`,
  mb: '16px',
  borderRadius: '8px',
  p: '6px',
  bg: isSelectedIssue ? 'rgba(253, 126, 80, 0.15)' : '#FAFAFA',
  alignItems: 'center',
}));

export const text = {
  _hover: {
    color: '#FD7E50',
    opacity: '1',
  },
  textAlign: 'left',
  width: '100%',
  mb: '10px',
  opacity: '.4',
};
