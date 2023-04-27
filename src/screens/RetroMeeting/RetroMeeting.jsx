import { Box, Container, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

import {
  HeaderMeeting,
  RequestHandler,
  RetroCard,
  RetroRow,
} from '../../components';
import { EVENT_TYPES, SOCKET_URL } from '../../constants';
import { useCreateParticipantMutation } from '../../hooks';
import {
  useGetMeetingParticipantsQuery,
  useGetMeetingQuery,
  useGetProfileQuery,
} from '../../hooks/useQueries';
import UserService from '../../services/UserService';

export const RetroMeeting = () => {
  const { id } = useParams();

  const [socketUrl, setSocketUrl] = useState(
    SOCKET_URL(id, UserService.getToken()),
  );

  const {
    data: meetingData,
    isLoading: isMeetingLoading,
    refetch: refetchMeetingData,
  } = useGetMeetingQuery(id);
  const { data: meetingParticipantsData, refetch: refetchMeetingParticipants } =
    useGetMeetingParticipantsQuery(id);
  const { data: profileData, isLoading: isProfileLoading } =
    useGetProfileQuery();

  const { mutate: createParticipant } = useCreateParticipantMutation(id);

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
      refetchMeetingParticipants();
      refetchMeetingData();
    },
    onMessage: (event) => {
      const { eventType } = JSON.parse(event.data);

      if (eventType === EVENT_TYPES.JOIN || eventType === EVENT_TYPES.LEAVE) {
        refetchMeetingParticipants();
      }
      if (eventType === EVENT_TYPES.SELECT) {
        refetchMeetingData();
      }
    },
    onError() {
      setSocketUrl(SOCKET_URL(id, UserService.getToken()));
    },
    shouldReconnect: () => true,
  });

  useEffect(() => {
    createParticipant();

    sendJsonMessage({
      eventType: EVENT_TYPES.JOIN,
    });

    return () => {
      sendJsonMessage({
        eventType: EVENT_TYPES.LEAVE,
      });
    };
  }, [refetchMeetingParticipants, createParticipant, sendJsonMessage]);

  const isLoading = isProfileLoading || isMeetingLoading;
  const owner = meetingData?.data.userId === profileData?.data.userId;

  return (
    <RequestHandler isLoading={isLoading}>
      <Container
        display={'flex'}
        flexDirection={'column'}
        maxWidth={'container.2xl'}
        height={'100vh'}
      >
        <HeaderMeeting
          share
          owner={owner}
          meetingId={meetingData?.data?.id}
          meetingParticipants={meetingParticipantsData?.data}
          name={meetingData?.data?.name}
        />
        <Box flexGrow={3} width={'100%'} overflowX={'auto'}>
          <Flex
            justifyContent={'center'}
            mx={'auto'}
            height={'100%'}
            w={{
              xl:
                meetingData?.data.columns.length * 423 +
                meetingData?.data.columns.length * 30,
              lg:
                meetingData?.data.columns.length * 370 +
                meetingData?.data.columns.length * 30,
              md:
                meetingData?.data.columns.length * 310 +
                meetingData?.data.columns.length * 30,
              sm:
                meetingData?.data.columns.length * 310 +
                meetingData?.data.columns.length * 30,
            }}
          >
            {meetingData?.data.columns.map(({ id, name, color, stickers }) => (
              <RetroRow
                key={id}
                sendJsonMessage={sendJsonMessage}
                id={id}
                name={name}
              >
                {stickers.map(({ id, ...data }) => (
                  <RetroCard
                    currentUser={profileData?.data.userId}
                    sendJsonMessage={sendJsonMessage}
                    id={id}
                    data={data}
                    color={color}
                    key={id}
                  />
                ))}
              </RetroRow>
            ))}
          </Flex>
        </Box>
      </Container>
    </RequestHandler>
  );
};
