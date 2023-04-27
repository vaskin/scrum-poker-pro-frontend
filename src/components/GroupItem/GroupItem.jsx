import { Box, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { BiTrash } from 'react-icons/all';

import { ReactComponent as LogoAvatarIcon } from '../../assets/game/logoAvatar.svg';

export const GroupItem = ({ email, onClick }) => {
  return (
    <Flex
      px={{
        sm: '8px',
        md: '25px',
      }}
      alignItems={'center'}
      justifyContent={'space-between'}
      mb={'16px'}
    >
      <Flex alignItems={'center'}>
        <LogoAvatarIcon />
        <Box ml={'24px'}>
          <Text color={'#868686'}>{email}</Text>
        </Box>
      </Flex>
      <Box onClick={onClick} as={'button'} opacity={'.32'}>
        <BiTrash size={'24px'} />
      </Box>
    </Flex>
  );
};

GroupItem.propTypes = {
  email: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
