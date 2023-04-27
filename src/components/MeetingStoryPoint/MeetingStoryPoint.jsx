import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { BiCheck } from 'react-icons/all';

import { VOTING_SYSTEMS, VOTING_SYSTEMS_NUMBER } from '../../constants';
import { useStoryPointMutation } from '../../hooks';
import { Popover } from '../Popover/Popover';

export const MeetingStoryPoint = ({
  currentIssue,
  setCurrentIssue,
  meetingId,
  votingSystem,
  owner,
}) => {
  const { mutateAsync } = useStoryPointMutation(
    meetingId,
    currentIssue?.id,
    setCurrentIssue,
  );
  const { onOpen, onClose, isOpen } = useDisclosure();

  const voting = () => {
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

  const handleClick = async (number) => {
    await mutateAsync({
      storyPoint: String(number),
    });

    onClose();
  };

  return (
    <>
      {owner ? (
        <Popover
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          maxWidth={'170px'}
          component={
            <Flex
              width={'75px'}
              height={{
                sm: currentIssue?.jiraId ? '45px' : '75px',
                md: '75px',
              }}
              align={'center'}
              justify={'center'}
              bg={{
                sm: '#fff',
                md: '#FAFAFA',
              }}
              borderRadius={'8px'}
            >
              <Text opacity={'.75'} fontSize={'32px'} fontWeight={'bold'}>
                {currentIssue?.storyPoint || ''}
              </Text>
            </Flex>
          }
        >
          {voting().map((number, index) => (
            <Flex
              key={index}
              justify={'space-between'}
              onClick={() => handleClick(number)}
              cursor={'pointer'}
              py={'8px'}
            >
              <Text fontWeight={'bold'}>{number}</Text>
              {currentIssue?.storyPoint === String(number) && (
                <BiCheck size={'24px'} />
              )}
            </Flex>
          ))}
        </Popover>
      ) : (
        <Flex
          width={'75px'}
          height={{
            sm: currentIssue?.jiraId ? '45px' : '75px',
            md: '75px',
          }}
          align={'center'}
          justify={'center'}
          bg={{
            sm: '#fff',
            md: '#FAFAFA',
          }}
          borderRadius={'8px'}
        >
          <Text opacity={'.75'} fontSize={'32px'} fontWeight={'bold'}>
            {currentIssue?.storyPoint || ''}
          </Text>
        </Flex>
      )}
    </>
  );
};

MeetingStoryPoint.propTypes = {
  votingSystem: PropTypes.string,
  meetingId: PropTypes.string.isRequired,
  setCurrentIssue: PropTypes.func.isRequired,
  currentIssue: PropTypes.object,
  owner: PropTypes.bool,
};
