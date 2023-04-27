import { css } from '@chakra-ui/react';

export const wrapper = ({ isDisabled, isActive }) => ({
  background: '#F0ECE8',
  border: '1px solid rgba(253, 126, 80, 0.32)',
  boxShadow: '0px 4px 32px rgba(0, 0, 0, 0.15)',
  borderRadius: '4.58922px',
  padding: '4px',
  transform: isActive ? 'translateY(0)' : 'translateY(25px)',
  transition: 'transform .2s linear',
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  marginLeft: '-20px',
  opacity: 1,
  width: {
    sm: '60px',
    md: 'auto',
  },
  _hover: isDisabled
    ? {}
    : {
        transform: 'translateY(0)',
      },
});

export const content = css({
  background: '#FFFFFF',
  borderRadius: '4.58922px',
  alignItems: 'center',
  flexDirection: 'column',
  paddingX: '15px',
  paddingTop: '7px',
  paddingBottom: '20px',
});

export const cardNumber = {
  fontWeight: 'bold',
  lineHeight: '1.2',
  marginTop: '15px',
  fontSize: {
    sm: '25px',
    md: '48px',
  },
};
