import { Box, Text } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RSelect from 'react-select';

import * as styles from './styles';

export const Select = ({
  options = [],
  name,
  placeholder = '',
  components,
  isClearable = true,
  withTitle = true,
  ...otherProps
}) => {
  const { setFieldValue, values } = useFormikContext();

  const [isActive, setIsActive] = useState(Boolean(values[name]));

  const handleSelectFocus = () => {
    setIsActive(true);
  };

  const handleChange = (option) => {
    setFieldValue(name, option?.value);

    if (option?.value) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleBlur = () => {
    if (values[name]) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  return (
    <Box width={'100%'} position={'relative'}>
      <RSelect
        blurInputOnSelect={false}
        {...otherProps}
        onFocus={handleSelectFocus}
        onBlur={handleBlur}
        components={components}
        placeholder
        styles={styles.select(withTitle)}
        isSearchable={false}
        isClearable={isClearable}
        options={options}
        onChange={handleChange}
      />
      <Text
        fontSize={[isActive ? '11px' : '16px', isActive ? '13px' : '18px']}
        css={styles.selectPlaceholder(isActive)}
      >
        {placeholder}
      </Text>
    </Box>
  );
};

Select.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  components: PropTypes.object,
  isClearable: PropTypes.bool,
  withTitle: PropTypes.bool,
};
