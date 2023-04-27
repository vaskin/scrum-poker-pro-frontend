import { Checkbox as CCheckbox } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

export const Checkbox = ({
  onHandleChange,
  value,
  children,
  name,
  ...otherProps
}) => {
  const { handleChange } = useFormikContext();

  const handleCheckboxChange = (event) => {
    handleChange(event);

    if (onHandleChange) {
      onHandleChange(event);
    }
  };

  return (
    <CCheckbox
      {...otherProps}
      name={name}
      onChange={handleCheckboxChange}
      value={value}
      size={'lg'}
      colorScheme='orange'
    >
      {children}
    </CCheckbox>
  );
};

Checkbox.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func,
};
