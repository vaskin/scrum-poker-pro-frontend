import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { ReactComponent as QuestionsIcon } from '../../assets/game/questions.svg';
import { VOTING_STATUSES } from '../../constants';
import { useStoryPointMutation } from '../../hooks';
import * as styles from './styles';

export const Card = ({
  you = false,
  data,
  votesData,
  votingStatus,
  setCurrentIssue,
  currentIssue,
  meetingId,
  owner,
  isLoading,
}) => {
  const [showText, setShowText] = useState(false);
  const { mutateAsync } = useStoryPointMutation(
    meetingId,
    currentIssue?.id,
    setCurrentIssue,
  );

  const isActive =
    !showText && votesData?.data.some((vote) => vote.userId === data?.userId);
  const storyPoint = showText
    ? votesData?.data?.find((vote) => vote?.userId === data?.userId)
        ?.storyPoint || '?'
    : '';

  useEffect(() => {
    if (votingStatus === VOTING_STATUSES.done) {
      setShowText(true);
    } else {
      setShowText(false);
    }
  }, [votingStatus]);

  const handleClick = () => {
    if (showText && !isNaN(storyPoint)) {
      mutateAsync({
        storyPoint: String(storyPoint),
      });
    }
  };

  return (
    <Box
      cursor={!isNaN(storyPoint) && owner && showText ? 'pointer' : 'initial'}
      pb={'40px'}
      overflow={'hidden'}
      as={'article'}
      onClick={handleClick}
    >
      <Text sx={styles.name}>{data.name}</Text>
      <Box sx={styles.card({ active: isActive, voted: showText })}>
        <Flex css={styles.content({ active: isActive, voted: showText })}>
          <Flex direction={'column'} align={'center'}>
            {!showText && !isActive && <QuestionsIcon />}
            <Avatar
              css={styles.avatar}
              src={`data:${data.contentType};base64,${data.avatar}`}
            />
          </Flex>
          {!showText && !isActive && (
            <Text
              whiteSpace={'nowrap'}
              textAlign={'center'}
              fontSize={'12px'}
              opacity={'.6'}
            >
              Сhooses a card
            </Text>
          )}
          {showText && !isLoading && (
            <Text fontWeight={'bold'} fontSize={'28px'}>
              {storyPoint}
            </Text>
          )}
          {you && (
            <Flex sx={styles.label}>
              <Text fontSize={'13px'} color={'#fff'} fontWeight={'bold'}>
                YOU
              </Text>
            </Flex>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

Card.propTypes = {
  you: PropTypes.bool,
  data: PropTypes.object,
  votesData: PropTypes.object,
  votingStatus: PropTypes.string,
  meetingId: PropTypes.string,
  setCurrentIssue: PropTypes.func,
  currentIssue: PropTypes.object,
  owner: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
};
