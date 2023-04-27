import { Box, Flex, Text } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import RSwitch from 'react-switch';

import * as styles from './styles';

export const Switch = ({ name, label = null }) => {
  const { setFieldValue, values } = useFormikContext();

  const handleChange = (nextChecked) => {
    setFieldValue(name, nextChecked);
    if (values?.first) {
      setFieldValue('first', false);
    }
  };

  return (
    <Flex alignItems={'center'}>
      {label && (
        <Text
          cursor={'pointer'}
          htmlFor={name}
          as={'label'}
          mr={'16px'}
          fontWeight={'400'}
          fontSize={'18px'}
        >
          {label}
        </Text>
      )}
      <RSwitch
        id={name}
        offColor='#DFE5EC'
        onColor='#FD7E50'
        onChange={handleChange}
        checked={values[name]}
        checkedIcon={false}
        height={24}
        handleDiameter={16}
        width={48}
        uncheckedIcon={
          <Flex css={styles.roundWrapper}>
            <Box css={styles.round} />
          </Flex>
        }
      />
    </Flex>
  );
};

Switch.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};
