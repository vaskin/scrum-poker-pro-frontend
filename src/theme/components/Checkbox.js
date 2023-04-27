export const Checkbox = {
  baseStyle: {
    alignItems: 'center',
    control: {
      borderRadius: '4px',
      _checked: {
        borderColor: 'transparent',
        bg: 'orange.400',
        _hover: {
          bg: 'orange.400',
          borderColor: 'transparent',
        },
      },
      border: '2px solid rgba(0, 0, 0, 0.32)',
    },
  },
  variants: {
    orange: {
      control: {
        borderColor: 'orange.400',
      },
    },
    gray: {
      control: {
        borderColor: 'rgba(0, 0, 0, 0.32)',
        _checked: {
          borderColor: 'transparent',
        },
      },
      label: {
        color: 'rgba(0, 0, 0, 0.4)',
        _checked: {
          color: '#000',
        },
      },
    },
  },
  sizes: {
    lg: {
      control: {
        width: '24px',
        height: '24px',
      },
      icon: {
        fontSize: '12px',
      },
    },
  },
};
