import { Box, Input as CInput, Text } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React, { forwardRef, useState } from 'react';
import { AiOutlineEye } from 'react-icons/all';

import * as styles from './styles';
import { errorText } from './styles';

export const Input = forwardRef(
  (
    {
      showError = true,
      placeholder,
      name,
      type = 'text',
      readonly = false,
      inputProps,
      ...otherProps
    },
    ref,
  ) => {
    const { handleChange, handleBlur, getFieldMeta } = useFormikContext();

    const { value, error } = getFieldMeta(name);

    const [inputType, setInputType] = useState(type);
    const [isActive, setIsActive] = useState(Boolean(value));

    const handleInputFocus = () => {
      setIsActive(true);
    };

    const handleInputBlur = (event) => {
      handleBlur(event);
      if (!value.length) {
        setIsActive(false);
      }
    };

    const handleInputChange = (event) => {
      handleChange(event);
    };

    const handleInputTypeChange = () => {
      setInputType((type) => (type === 'password' ? 'text' : 'password'));
    };

    return (
      <Box {...otherProps}>
        <Box position={'relative'}>
          <CInput
            ref={ref}
            isReadOnly={readonly}
            value={value}
            isInvalid={error}
            name={name}
            css={styles.input}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            type={inputType}
            {...inputProps}
          />
          <Text
            fontSize={[isActive ? '11px' : '16px', isActive ? '13px' : '18px']}
            css={styles.inputPlaceholder(isActive)}
          >
            {placeholder}
          </Text>
          {type === 'password' && (
            <Box css={styles.eye} onClick={handleInputTypeChange}>
              <AiOutlineEye size={'24'} color={'#B3B3B3'} />
            </Box>
          )}
        </Box>
        {showError && error ? <Text css={errorText}>{error}</Text> : null}
      </Box>
    );
  },
);

Input.displayName = 'Input';

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password']),
  isFullWidth: PropTypes.bool,
  readonly: PropTypes.bool,
  showError: PropTypes.bool,
  inputProps: PropTypes.object,
};
