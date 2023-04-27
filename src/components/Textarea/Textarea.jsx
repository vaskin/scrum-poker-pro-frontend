import { Box, Text, Textarea as CTextarea } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import * as styles from './styles';

export const Textarea = ({
  name,
  placeholder,
  showError = true,
  autofocus = false,
  height = '200px',
  onKeyDown,
  ...props
}) => {
  const { handleChange, handleBlur, getFieldMeta } = useFormikContext();

  const { value, error } = getFieldMeta(name);
  const [isActive, setIsActive] = useState(Boolean(value));
  const ref = useRef();

  const handleTextAreaFocus = () => {
    setIsActive(true);
  };

  const handleTextareaBlur = (event) => {
    handleBlur(event);
    if (!value.length) {
      setIsActive(false);
    }
  };

  const handleTextareaChange = (event) => {
    handleChange(event);
  };

  useEffect(() => {
    if (autofocus) {
      ref?.current?.focus();
    }
  }, [autofocus]);

  return (
    <Box position={'relative'}>
      <CTextarea
        ref={ref}
        css={styles.textarea}
        onBlur={handleTextareaBlur}
        onChange={handleTextareaChange}
        onFocus={handleTextAreaFocus}
        name={name}
        height={height}
        resize={'none'}
        value={value}
        onKeyDown={onKeyDown}
        {...props}
      />
      <Text
        fontSize={[isActive ? '11px' : '16px', isActive ? '13px' : '18px']}
        css={styles.textareaPlaceholder(isActive)}
      >
        {placeholder}
      </Text>
      {showError && error ? <Text css={styles.errorText}>{error}</Text> : null}
    </Box>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  showError: PropTypes.bool,
  autofocus: PropTypes.bool,
  height: PropTypes.string,
  onKeyDown: PropTypes.func,
};
