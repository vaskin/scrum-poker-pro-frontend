import { css } from '@chakra-ui/react';

export const searchIcon = css((isFocused) => ({
  position: 'absolute',
  left: '2px',
  top: '50%',
  transform: 'translateY(-50%)',
  opacity: isFocused ? '1' : '.32',
}));

export const input = {
  border: 'none',
  pl: '36px',
  width: '100%',
  maxWidth: {
    sm: '100%',
    md: '214px',
  },
};

export const filterWrapper = css({
  mx: '-13px',
  px: '13px',
  borderBottom: '1px solid #B8B8B8',
  pb: '10px',
  justifyContent: 'space-between',
});

export const accordionPanel = css({
  pb: '0',
  mx: '-12px',
  px: '12px',
  pt: '12px',
});

export const round = (isConnected) => ({
  borderRadius: '50%',
  bg: isConnected ? '#50FD61' : '#FD5050',
  position: 'absolute',
  width: '8px',
  height: '8px',
  bottom: '0',
  right: '0',
});

export const trash = css({
  position: 'absolute',
  right: '2px',
  top: '50%',
  transform: 'translateY(-50%)',
  opacity: '.32',
  zIndex: '5',
});
