export const Button = {
  variants: {
    outline: {
      fontWeight: 'bold',
      fontSize: {
        sm: '16px',
        lg: '18px',
      },
      height: {
        sm: '48px',
        md: '60px',
      },
      bg: '#fff',
      _hover: {
        bg: '#f0f0f0',
      },
      _active: {
        bg: '#f0f0f0',
      },
    },
    solid: {
      fontWeight: 'bold',
      fontSize: {
        sm: '16px',
        lg: '18px',
      },
      height: {
        sm: '48px',
        md: '60px',
      },
    },
  },
  defaultProps: {
    colorScheme: 'orange',
  },
};
