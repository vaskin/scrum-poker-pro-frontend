import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { ReactComponent as LogoIcon } from '../../assets/game/logo.svg';
import { ReactComponent as LogoSmallIcon } from '../../assets/game/logoSmall.svg';
import * as styles from './styles';

export const PokerCard = memo(({ onClick, number, isDisabled, isActive }) => {
  const logo = useBreakpointValue({
    sm: <LogoSmallIcon />,
    md: <LogoIcon />,
  });

  const handleClick = () => {
    if (!isDisabled) {
      onClick();
    }
  };

  return (
    <Box
      onClick={handleClick}
      as={'article'}
      sx={styles.wrapper({ isDisabled, isActive })}
    >
      <Flex css={styles.content}>
        {logo}
        <Text sx={styles.cardNumber}>{number}</Text>
      </Flex>
    </Box>
  );
});

PokerCard.propTypes = {
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isActive: PropTypes.bool,
};
