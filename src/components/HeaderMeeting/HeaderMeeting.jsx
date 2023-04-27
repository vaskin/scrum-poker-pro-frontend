import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as LogoIcon } from '../../assets/emptyLogo.svg';
import { ROUTES } from '../../constants';
import { HeaderMeetingUsers } from './HeaderMeetingUsers/HeaderMeetingUsers';

export const HeaderMeeting = ({
  name = 'Meeting name',
  meetingParticipants = [],
  owner,
  meetingId,
  share = false,
}) => {
  const isShowUsers = useBreakpointValue({ sm: false, base: true, md: true });

  return (
    <Flex align={'center'} mb={'37px'} pt={'28px'} justify={'space-between'}>
      <Flex align={'center'}>
        <NavLink to={ROUTES.home}>
          <LogoIcon />
        </NavLink>
        <Box ml={'16px'}>
          <Text
            mb={{
              sm: '0',
              mb: '6px',
            }}
            fontSize={'23px'}
            fontWeight={'bold'}
          >
            {name}
          </Text>
          {isShowUsers && (
            <Text opacity={'.32'}>
              {meetingParticipants.length}/{meetingParticipants.length} users
            </Text>
          )}
        </Box>
      </Flex>
      <HeaderMeetingUsers
        share={share}
        owner={owner}
        meetingId={meetingId}
        meetingParticipants={meetingParticipants}
      />
    </Flex>
  );
};

HeaderMeeting.propTypes = {
  name: PropTypes.string,
  meetingParticipants: PropTypes.array,
  meetingId: PropTypes.string,
  owner: PropTypes.bool,
  result: PropTypes.bool,
  share: PropTypes.bool,
};
