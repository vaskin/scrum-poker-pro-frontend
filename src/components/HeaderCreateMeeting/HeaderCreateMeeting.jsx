import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/all';
import { NavLink } from 'react-router-dom';

import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import { ROUTES } from '../../constants';
import * as styles from './styles';

export const HeaderCreateMeeting = ({
  onArrowLeftClick = null,
  onArrowRightClick = null,
  title,
}) => {
  return (
    <Flex
      flexDirection={{
        base: 'column',
        md: 'row',
      }}
      mt={['16px', '36px']}
      css={styles.container}
    >
      <Box
        mb={{
          base: '32px',
          md: '0',
        }}
        position={{
          base: 'static',
          md: 'absolute',
        }}
        left={'0'}
      >
        <NavLink to={ROUTES.home}>
          <LogoIcon />
        </NavLink>
      </Box>
      <Flex
        width={{
          sm: '100%',
          md: 'auto',
        }}
        justifyContent={{
          sm: 'space-between',
          md: 'center',
        }}
        css={styles.controls}
      >
        <IconButton
          isDisabled={!onArrowLeftClick}
          onClick={onArrowLeftClick}
          aria-label={'left arrow'}
          css={styles.button}
          colorScheme={'orange'}
          icon={<FiArrowLeft size={'20'} />}
        />
        <Text
          mx={'16px'}
          fontWeight={{
            sm: 'regular',
            md: 'bold',
          }}
          lineHeight={'1'}
          fontSize={{
            sm: '16px',
            md: '28px',
            lg: '32px',
          }}
        >
          {title}
        </Text>
        <IconButton
          isDisabled={!onArrowRightClick}
          onClick={onArrowRightClick}
          css={styles.button}
          aria-label={'right arrow'}
          colorScheme={'orange'}
          icon={<FiArrowRight size={'20'} />}
        />
      </Flex>
      <div />
    </Flex>
  );
};

HeaderCreateMeeting.propTypes = {
  onArrowLeftClick: PropTypes.func,
  onArrowRightClick: PropTypes.func,
  title: PropTypes.string.isRequired,
};
