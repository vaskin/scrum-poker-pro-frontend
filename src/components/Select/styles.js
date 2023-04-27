import { css } from '@chakra-ui/react';

export const select = (withTitle) => ({
  control: (provided, state) => {
    const border = state.isFocused
      ? '1px solid #FD7E50 !important'
      : '1px solid rgba(253, 126, 80, 0.48) !important';

    return {
      ...provided,
      width: '100%',
      height: '58px',
      borderRadius: '8px',
      border,
    };
  },
  singleValue: (provided) => {
    return {
      ...provided,
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#111',
      marginTop: withTitle ? '4px' : '0',
      paddingLeft: '5px',
    };
  },
  placeholder: (provided) => ({
    ...provided,
    color: 'rgba(17, 17, 17, 0.32)',
    fontSize: '18px',
    fontWeight: 'bold',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#111',
    fontSize: '18px',
    fontWeight: 'bold',
  }),
  multiValue: (provided) => ({
    ...provided,
    marginTop: '15px',
    backgroundColor: 'transparent',
    marginLeft: '0',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    color: 'rgba(17, 17, 17, 0.32)',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  valueContainer: (provided) => ({
    ...provided,
    overflow: 'visible',
  }),
});

export const selectPlaceholder = css((isActive) => ({
  fontWeight: 'bold',
  color: 'rgba(17, 17, 17, 0.32)',
  transition: 'all .1s linear',
  pointerEvents: 'none',
  left: '16px',
  position: 'absolute',
  top: isActive ? '16px' : '50%',
  zIndex: '2',
  transform: 'translateY(-50%)',
}));
