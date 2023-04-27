import { Center, Flex, Spinner, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

export const RequestHandler = ({
  children,
  isError = false,
  isLoading = true,
  height = '100vh',
  width = '100%',
  spinnerSize = 'xl',
}) => {
  if (isLoading) {
    return (
      <Flex width={width} height={height} justify={'center'} align={'center'}>
        <Spinner size={spinnerSize} color={'orange'} />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Center flex={1}>
        <Text textAlign={'center'}>Some error...</Text>
      </Center>
    );
  }

  return <>{children}</>;
};

RequestHandler.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool,
  children: PropTypes.node,
  height: PropTypes.string,
  width: PropTypes.string,
  spinnerSize: PropTypes.string,
};
