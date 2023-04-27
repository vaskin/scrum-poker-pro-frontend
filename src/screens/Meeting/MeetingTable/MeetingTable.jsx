import { Box, Button, Flex, useBreakpointValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

import { ReactComponent as CardsIcon } from '../../../assets/game/cards.svg';
import { PokerCard } from '../../../components';
import {
  VOTING_STATUSES,
  VOTING_SYSTEMS,
  VOTING_SYSTEMS_NUMBER,
} from '../../../constants';
import {
  useCreateVoteMutation,
  useRemoveVoteMutation,
  useUpdateVotingStatusMutation,
} from '../../../hooks';
import * as styles from './styles';

export const MeetingTable = ({
  votingSystem,
  currentIssue,
  owner,
  meetingId,
  setCurrentIssue,
  refetchVotes,
  votingStatus,
  onToggleMenu,
  votesData,
  profileData,
}) => {
  const { mutateAsync: vote } = useCreateVoteMutation(currentIssue?.id);
  const { mutateAsync: removeVote } = useRemoveVoteMutation(
    currentIssue?.id,
    profileData?.userId,
  );
  const { mutateAsync: updateVotingStatus, isLoading } =
    useUpdateVotingStatusMutation(currentIssue?.id, meetingId, setCurrentIssue);
  const showIssueButton = useBreakpointValue({
    sm: true,
    lg: false,
  });

  const selectedCard = votesData?.find(
    (vote) => vote?.userId === profileData?.userId,
  );

  const isDisabled = votingStatus === VOTING_STATUSES.done;

  const cards = () => {
    switch (votingSystem) {
      case VOTING_SYSTEMS.fibonacci:
        return VOTING_SYSTEMS_NUMBER.fibonacci;
      case VOTING_SYSTEMS.powerOf2:
        return VOTING_SYSTEMS_NUMBER.powerOf2;
      case VOTING_SYSTEMS.tShirts:
        return VOTING_SYSTEMS_NUMBER.tShirts;
      default:
        return VOTING_SYSTEMS_NUMBER.fibonacci;
    }
  };

  const handleClick = (storyPoint, isActive) => {
    if (isActive) {
      removeVote();
    } else if (!isDisabled) {
      vote({
        storyPoint,
      });
    }
  };

  const handleUpdate = async () => {
    await updateVotingStatus({
      votingStatus:
        currentIssue?.votingStatus === VOTING_STATUSES.done
          ? VOTING_STATUSES.new
          : VOTING_STATUSES.done,
    });

    if (currentIssue?.votingStatus === VOTING_STATUSES.done) {
      refetchVotes();
    }
  };

  return (
    <Flex css={styles.wrapper}>
      <Flex align={'center'} justify={'center'}>
        {showIssueButton && (
          <Box sx={styles.buttonWrapperSmall}>
            <Button variant={'outline'} onClick={onToggleMenu} isFullWidth>
              Issues
            </Button>
          </Box>
        )}
        {owner ? (
          <Box sx={styles.buttonWrapper}>
            <Button
              isDisabled={!Object.keys(currentIssue || {}).length}
              onClick={handleUpdate}
              isLoading={isLoading}
              _disabled={{
                opacity: 1,
              }}
              leftIcon={
                <Box mr={'12px'}>
                  <CardsIcon />
                </Box>
              }
              isFullWidth
            >
              {currentIssue?.votingStatus === VOTING_STATUSES.done
                ? 'Vote again'
                : 'Reveal card'}
            </Button>
          </Box>
        ) : null}
      </Flex>
      <Flex sx={styles.cards}>
        {cards().map((number, index) => {
          const isActive = selectedCard?.storyPoint === String(number);
          return (
            <PokerCard
              isActive={isActive}
              isDisabled={!Object.keys(currentIssue || {}).length || isDisabled}
              onClick={() => handleClick(String(number), isActive)}
              key={index}
              number={number}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

MeetingTable.propTypes = {
  votingSystem: PropTypes.string,
  currentIssue: PropTypes.object,
  owner: PropTypes.bool,
  meetingId: PropTypes.string,
  setCurrentIssue: PropTypes.func.isRequired,
  refetchVotes: PropTypes.func,
  votingStatus: PropTypes.string,
  onToggleMenu: PropTypes.func,
  votesData: PropTypes.array,
  profileData: PropTypes.object,
};
