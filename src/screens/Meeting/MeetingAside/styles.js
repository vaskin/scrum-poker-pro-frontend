export const aside = (isOpen) => ({
  ml: isOpen
    ? 0
    : {
        sm: '0',
        md: '-590px',
        lg: '-560px',
      },
  transform: {
    sm: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    md: 'none',
  },
  borderTopRightRadius: {
    sm: 'none',
    md: '16px',
  },
  borderBottomRightRadius: {
    sm: 'none',
    md: '16px',
  },
  bottom: 0,
  border: {
    sm: 'none',
    md: '2px solid #BFBFBF',
  },
  bg: '#fff',
  pt: {
    sm: '16px',
    md: '28px',
  },
  pl: {
    sm: 0,
    md: '22px',
    lg: '22px',
  },
  pr: {
    sm: '0',
    md: '22px',
  },
  pb: {
    sm: '16px',
    md: '28px',
  },
  px: {
    sm: '16px',
  },
  height: '100vh',
  minHeight: '765px',
  transition: 'margin-left .9s, transform .9s',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: {
    sm: 'absolute',
    xl: 'relative',
  },
  left: 0,
  top: 0,
  right: {
    sm: '0',
    md: 'auto',
  },
  zIndex: '2',
});

export const asideButton = {
  borderTopRightRadius: '16px',
  borderBottomRightRadius: '16px',
  alignItems: 'center',
  width: '20px',
  bg: '#fff',
  zIndex: '2',
  height: '60px',
  border: '2px solid #BFBFBF',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  right: '-20px',
  _after: {
    content: "''",
    position: 'absolute',
    left: '-2px',
    height: '56px',
    width: '2px',
    bg: '#fff',
  },
  display: {
    sm: 'none',
    lg: 'flex',
  },
};

export const headerText = {
  pr: '8px',
  mr: '8px',
  whiteSpace: 'nowrap',
  mt: {
    sm: '8px',
    md: '0',
  },
};

export const issueButton = {
  position: 'absolute',
  top: '50%',
  right: {
    md: '-80px',
    xl: '-110px',
  },
  transform: 'translateY(-50%)',
  display: {
    md: 'none',
    lg: 'flex',
  },
};
