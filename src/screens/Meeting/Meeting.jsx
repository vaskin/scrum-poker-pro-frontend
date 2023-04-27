import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/all';
import { useParams } from 'react-router-dom';

import { client } from '../../api/socket';
import { ReactComponent as CloudIcon } from '../../assets/game/cloud.svg';
import {
  Card,
  HeaderMeeting,
  MeetingStoryPoint,
  RequestHandler,
} from '../../components';
import { EVENT_TYPES } from '../../constants';
import {
  useCreateParticipantMutation,
  useUpdateSyncStoryPointMutation,
} from '../../hooks';
import {
  useGetIssuesQuery,
  useGetMeetingParticipantsQuery,
  useGetMeetingQuery,
  useGetProfileQuery,
  useGetVotesQuery,
} from '../../hooks/useQueries';
import UserService from '../../services/UserService';
import { recursiveFind } from '../../utils/recursiveFind';
import { MeetingAside } from './MeetingAside/MeetingAside';
import { MeetingTable } from './MeetingTable/MeetingTable';
import { MeetingVotes } from './MeetingVotes/MeetingVotes';
import { MeetingVotesList } from './MeetingVotes/MeetingVotesList';
import * as styles from './styles';

export const Meeting = () => {
  const { id } = useParams();

  const {
    data: meetingData,
    isLoading: isMeetingLoading,
    refetch: refetchMeeting,
    isFetching,
  } = useGetMeetingQuery(id);
  const { data: meetingParticipantsData, refetch: refetchMeetingParticipants } =
    useGetMeetingParticipantsQuery(id);
  const { data: profileData, isLoading: isProfileLoading } =
    useGetProfileQuery();
  const { data: issuesData, refetch: refetchIssues } = useGetIssuesQuery(id);
  const [currentIssue, setCurrentIssue] = useState({});
  const { mutateAsync: createParticipant } = useCreateParticipantMutation(id);
  const {
    data: votesData,
    refetch: refetchVotes,
    isFetching: isVotingFetching,
  } = useGetVotesQuery(currentIssue?.id);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpointValue({
    sm: true,
    md: false,
  });
  const {
    mutateAsync: updateSyncStoryPoint,
    isLoading: isUpdateSyncStoryPointLoading,
  } = useUpdateSyncStoryPointMutation(currentIssue?.id, id, setCurrentIssue);

  const owner = meetingData?.data.userId === profileData?.data.userId;
  const votingStatus = currentIssue?.votingStatus;

  useEffect(() => {
    if (!isFetching) {
      setCurrentIssue(
        recursiveFind(issuesData?.data, meetingData?.data?.currentIssueId),
      );
    }
  }, [setCurrentIssue, issuesData, meetingData, isMeetingLoading, isFetching]);

  const isLoading = isProfileLoading;

  const onToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleFormSubmit = (values) => {
    updateSyncStoryPoint({
      fieldId: values?.field?.id,
      schema: values?.field?.schema,
    });
  };

  useEffect(() => {
    document.title = isLoading
      ? 'Loading...'
      : `ScrumPokerPro | ${currentIssue?.title || 'meeting'}`;

    if (!client.isConnect && !isLoading) {
      client.setFunctions({
        [EVENT_TYPES.ISSUES]: refetchIssues,
        [EVENT_TYPES.SELECT]: refetchMeeting,
        [EVENT_TYPES.VOTES]: refetchVotes,
        [EVENT_TYPES.JOIN]: refetchMeetingParticipants,
      });

      client.connect(id, UserService.getToken()).then(async () => {
        await createParticipant();
        await refetchMeetingParticipants();
        await refetchIssues();

        client.send(EVENT_TYPES.JOIN, null);
      });
    }
  }, [
    createParticipant,
    currentIssue?.title,
    isLoading,
    id,
    refetchIssues,
    refetchMeeting,
    refetchVotes,
    refetchMeetingParticipants,
  ]);

  useEffect(
    () => () => {
      client.send(EVENT_TYPES.LEAVE, null);
      client.close();
    },
    [],
  );

  return (
    <RequestHandler isLoading={isLoading}>
      <Flex>
        <MeetingAside
          onToggleMenu={onToggleMenu}
          isOpen={isOpen}
          owner={owner}
          setCurrentIssue={setCurrentIssue}
          currentIssue={currentIssue}
          meetingId={id}
          data={issuesData}
        />
        <Flex css={styles.content}>
          <Box sx={styles.contentInner}>
            <Container sx={styles.container}>
              <HeaderMeeting
                owner={owner}
                meetingId={meetingData?.data?.id}
                meetingParticipants={meetingParticipantsData?.data}
                name={meetingData?.data?.name}
              />
              <Formik onSubmit={handleFormSubmit} initialValues={{ field: {} }}>
                {({ handleSubmit }) => (
                  <Box sx={styles.taskWrapper}>
                    <Flex
                      alignItems={{
                        sm: 'flex-start',
                        md: 'center',
                      }}
                      justifyContent={'space-between'}
                    >
                      <Box flexGrow={1} sx={styles.titleWrapper}>
                        <Flex align={'center'} justify={'space-between'}>
                          <Flex flexGrow={'1'}>
                            <Text mb={'8px'}>
                              {currentIssue?.jiraId ? (
                                (
                                  <a href={currentIssue?.link}>
                                    {currentIssue?.key}
                                  </a>
                                ) || ''
                              ) : currentIssue?.storyPoint &&
                                currentIssue?.link ? (
                                <a href={currentIssue?.link}>
                                  <FiExternalLink
                                    size={'24px'}
                                    color={'#FD7E50'}
                                  />
                                </a>
                              ) : (
                                ''
                              )}
                            </Text>
                            {isMobile && currentIssue?.jiraId && owner && (
                              <Box
                                ml={'16px'}
                                maxWidth={'120px'}
                                width={'100%'}
                              >
                                <MeetingVotesList />
                              </Box>
                            )}
                          </Flex>
                          {isMobile && currentIssue?.jiraId && (
                            <Box width={'76px'}>
                              <MeetingStoryPoint
                                owner={owner}
                                setCurrentIssue={setCurrentIssue}
                                meetingId={id}
                                currentIssue={currentIssue}
                                votingSystem={meetingData?.data?.votingSystem}
                              />
                            </Box>
                          )}
                        </Flex>
                        <Flex sx={styles.titleWrapperInner(currentIssue)}>
                          <Text sx={styles.title}>
                            {currentIssue?.title || ''}
                          </Text>
                          {isMobile && currentIssue?.jiraId && owner && (
                            <Button
                              isDisabled={
                                !currentIssue?.storyPoint ||
                                currentIssue?.synchronized
                              }
                              isLoading={isUpdateSyncStoryPointLoading}
                              variant={'ghost'}
                              onClick={handleSubmit}
                              maxWidth={'75px'}
                              width={'100%'}
                              ml={'16px'}
                            >
                              <CloudIcon />
                            </Button>
                          )}
                        </Flex>
                      </Box>
                      <Box>
                        <MeetingVotes
                          owner={owner}
                          synchronized={currentIssue?.synchronized}
                          setCurrentIssue={setCurrentIssue}
                          meetingId={id}
                          currentIssue={currentIssue}
                          votingSystem={meetingData?.data?.votingSystem}
                        />
                      </Box>
                    </Flex>
                    <Box sx={styles.grid}>
                      <RequestHandler height={'100%'} isLoading={false}>
                        <Grid
                          autoFlow={'1fr'}
                          gap={{
                            md: '45px',
                            lg: '15px',
                          }}
                          templateColumns={{
                            sm: 'repeat(3, 1fr)',
                            md: 'repeat(5, 1fr)',
                            lg: 'repeat(6, 1fr)',
                            xl: 'repeat(10, 1fr)',
                          }}
                        >
                          {meetingParticipantsData?.data?.map((user) => (
                            <Card
                              isLoading={isVotingFetching || isFetching}
                              currentIssue={currentIssue}
                              setCurrentIssue={setCurrentIssue}
                              meetingId={id}
                              votingStatus={votingStatus}
                              votesData={votesData}
                              owner={owner}
                              key={user.userId}
                              data={user}
                              you={user.userId === profileData?.data.userId}
                            />
                          ))}
                        </Grid>
                      </RequestHandler>
                    </Box>
                  </Box>
                )}
              </Formik>
            </Container>
          </Box>
          <MeetingTable
            onToggleMenu={onToggleMenu}
            votingStatus={votingStatus}
            refetchVotes={refetchVotes}
            setCurrentIssue={setCurrentIssue}
            meetingId={id}
            owner={owner}
            votesData={votesData?.data}
            currentIssue={currentIssue}
            votingSystem={meetingData?.data?.votingSystem}
            profileData={profileData?.data}
          />
        </Flex>
      </Flex>
    </RequestHandler>
  );
};
