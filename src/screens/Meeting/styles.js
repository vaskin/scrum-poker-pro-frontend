import { css } from '@chakra-ui/react';

export const content = css({
  width: '100%',
  alignItems: 'center',
  height: '100vh',
  minHeight: '765px',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const contentInner = {
  width: '100%',
  pl: {
    lg: '80px',
    xl: '10px',
  },
  flex: 1,
  pb: '48px',
};

export const taskWrapper = {
  bg: {
    sm: 'transparent',
    md: '#fff',
  },
  p: {
    sm: '0',
    md: '16px',
  },
  mx: 'auto',
  borderRadius: '16px',
  maxWidth: '1180px',
  height: 'calc(100% - 75px)',
  minHeight: '332px',
  border: {
    sm: 'none',
    md: '2px solid #BFBFBF',
  },
};

export const grid = {
  mt: '30px',
  height: {
    sm: 'calc(100% - 30px)',
    md: 'calc(100% - 130px)',
  },
  p: {
    sm: '8px 16px',
    md: '24px',
  },
  borderRadius: '16px',
  bg: {
    sm: '#fff',
    md: '#FAFAFA',
  },
  overflowY: 'auto',
};

export const title = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: 'orange.400',
  fontWeight: 'bold',
  fontSize: {
    sm: '28px',
    lg: '32px',
  },
};

export const titleWrapper = {
  overflow: 'hidden',
  mt: {
    mt: '-5px',
    md: '0',
  },
  pt: {
    sm: '5px',
    md: '0',
  },
  px: {
    sm: '10px',
    md: '0',
  },
  mx: {
    sm: '-10px',
    md: '0',
  },
  mr: {
    sm: '0',
    md: '20px',
  },
};

export const container = {
  height: 'calc(100vh - 328px)',
  maxWidth: 'container.2xl',
  width: '100%',
};

export const titleWrapperInner = (currentIssue) => ({
  mt: {
    sm: currentIssue?.jiraId ? '14px' : '0',
    md: '0',
  },
  mb: {
    sm: '0',
    md: '24px',
  },
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});
