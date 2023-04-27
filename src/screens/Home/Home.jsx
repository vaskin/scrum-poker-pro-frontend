import { Box, Button, Container, Flex, Grid, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/all';
import { useHistory } from 'react-router-dom';

import { HeaderHome, RequestHandler } from '../../components/';
import { ConfirmModal } from '../../components/ConfirmModal/ConfirmModal';
import { ROUTES } from '../../constants';
import { useRemoveMeetingMutation } from '../../hooks';
import {
  useGetMeetingsQuery,
  useGetProfileQuery,
} from '../../hooks/useQueries';
import { HomeMeetingCard } from './HomeMeetingCard/HomeMeetingCard';
import * as styles from './styles';

export const Home = () => {
  const history = useHistory();
  const { data: meetings, ...mettingsQueryProps } = useGetMeetingsQuery();
  const { data: profile, ...profileQueryProps } = useGetProfileQuery();
  const { mutateAsync, isLoading } = useRemoveMeetingMutation();

  const [confirmMeetingRemove, setConfirmMeetingRemove] = useState({
    id: undefined,
    isModalOpen: false,
  });

  const handleClick = () => {
    history.push(ROUTES.pokerPlanning);
  };

  const handleOpenConfirmModal = (id) => {
    setConfirmMeetingRemove({
      id,
      isModalOpen: true,
    });
  };

  const handleCloseConfirmModal = () => {
    setConfirmMeetingRemove({
      id: undefined,
      isModalOpen: false,
    });
  };

  const removeMeeting = async () => {
    await mutateAsync({ id: confirmMeetingRemove.id });
    setConfirmMeetingRemove({
      id: undefined,
      isModalOpen: false,
    });
  };

  useEffect(() => {
    document.title = 'ScrumPokerPro | Meetings';
  }, []);

  return (
    <RequestHandler
      isLoading={profileQueryProps.isLoading || mettingsQueryProps.isLoading}
      isError={profileQueryProps.isError || mettingsQueryProps.isError}
    >
      <Container maxWidth={'container.xl'} width={'100%'}>
        <Flex css={styles.wrapper}>
          <Box mb={'40px'}>
            <HeaderHome profile={profile?.data} />
            <Grid
              autoRows={'1fr'}
              gridTemplateColumns={{
                sm: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              gap={['16px', '32px']}
              mt={'55px'}
            >
              <Flex as={'button'} onClick={handleClick} css={styles.createCard}>
                <GoPlus size={'24'} color={'#FD7E50'} />
                <Text css={styles.createCardText}>Start new meeting</Text>
              </Flex>
              {meetings?.data.map((meeting) => (
                <HomeMeetingCard
                  onRemove={handleOpenConfirmModal}
                  key={meeting.id}
                  data={meeting}
                />
              ))}
            </Grid>
          </Box>
          <Flex justifyContent={'center'}>
            <Box maxWidth={'225px'} width={'100%'}>
              <Button onClick={handleClick} isFullWidth>
                Start new meeting
              </Button>
            </Box>
          </Flex>
        </Flex>
        <ConfirmModal
          isOpen={confirmMeetingRemove.isModalOpen}
          onClose={handleCloseConfirmModal}
          onConfirm={removeMeeting}
          isLoading={isLoading}
        >
          <Text textAlign={'center'}>
            Are you sure you want to delete this appointment?
          </Text>
        </ConfirmModal>
      </Container>
    </RequestHandler>
  );
};
