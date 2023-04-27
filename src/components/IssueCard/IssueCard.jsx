import { Box, Flex, Image, Text, useDisclosure } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/all';

import { client } from '../../api/socket';
import { ReactComponent as CloudIcon } from '../../assets/game/cloud.svg';
import { ReactComponent as ErrorIcon } from '../../assets/game/error.svg';
import { ReactComponent as StoryIcon } from '../../assets/game/story.svg';
import { ReactComponent as TaskIcon } from '../../assets/game/task.svg';
import { EVENT_TYPES, TYPES } from '../../constants';
import {
  useDeleteIssueMutation,
  useImportSubTasksMutation,
  useUpdateMeetingMutation,
} from '../../hooks';
import { Popover } from '../Popover/Popover';
import { RequestHandler } from '../RequestHandler/RequestHandler';
import * as styles from './styles';

export const IssueCard = ({
  data,
  meetingId,
  setIssue,
  onHandleOpen,
  setCurrentIssue,
  currentIssue,
  isChild = false,
  owner,
}) => {
  const {
    mutateAsync: deleteIssue,
    isLoading: isDeleteIssueLoading,
    error: deleteIssueError,
  } = useDeleteIssueMutation(data?.id, meetingId);
  const {
    mutateAsync: importSubTasks,
    isLoading: isImportSubTasksLoading,
    error: importSubTasksError,
  } = useImportSubTasksMutation(meetingId, data?.id);
  const {
    mutateAsync: updateMeeting,
    isLoading: isUpdateMeetingLoading,
    error: updateMeetingError,
  } = useUpdateMeetingMutation(meetingId);

  const { isOpen: isActive, onOpen, onClose } = useDisclosure();
  const ref = useRef();

  useEffect(() => {
    const lastTask = localStorage.getItem('lastTask') || null;
    if (lastTask) {
      if (lastTask === data?.id) {
        ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [data?.id, ref]);

  const error = deleteIssueError || importSubTasksError || updateMeetingError;

  const icon = () => {
    switch (data.type) {
      case TYPES.TASK:
        return <TaskIcon />;
      case TYPES.BUG:
        return <ErrorIcon />;
      case TYPES.STORY:
        return <StoryIcon />;
      default:
        return <TaskIcon />;
    }
  };

  const handleClick = async (event) => {
    event.stopPropagation();

    if (currentIssue === data?.id) {
      return false;
    }

    if (owner) {
      setCurrentIssue(data);

      await updateMeeting({
        currentIssueId: data.id,
        name: data.title,
      });

      client.send(EVENT_TYPES.SELECT, data.id);
    }
  };

  const handleRemove = () => {
    onClose();
    deleteIssue();
  };

  const handleEdit = () => {
    setIssue({ ...data, meetingId });
    onHandleOpen();
  };

  const handleImportTasks = () => {
    onClose();
    importSubTasks();
  };

  const isSelectedIssue = currentIssue === data?.id;
  const isLoading =
    isDeleteIssueLoading || isImportSubTasksLoading || isUpdateMeetingLoading;

  return (
    <Box
      ref={ref}
      as={'article'}
      onClick={handleClick}
      cursor={owner ? 'pointer' : 'initial'}
      ml={isChild ? '20px' : '0'}
    >
      <Flex css={styles.wrapper({ isActive, isSelectedIssue })}>
        {data?.iconUrl ? <Image src={data?.iconUrl} /> : icon()}
        <Flex
          flexGrow={1}
          justify={'space-between'}
          align={'center'}
          ml={'8px'}
        >
          <Box>
            <Text fontSize={'12px'} as={'a'} href={data?.link}>
              {data?.key}
            </Text>
            <Text wordBreak={'break-word'} fontWeight={'bold'}>
              {data?.title}
            </Text>
          </Box>
          <Flex align={'center'}>
            {data?.jiraId && !data?.synchronized && data?.storyPoint && (
              <Box mr={'24px'}>
                <CloudIcon />
              </Box>
            )}
            {data?.storyPoint ? (
              <Text opacity={'.75'} fontWeight={'bold'} ml={'12px'} mr={'12px'}>
                {data?.storyPoint}
              </Text>
            ) : null}
            {owner ? (
              <RequestHandler
                height={'24px'}
                width={'24px'}
                spinnerSize={'sm'}
                isLoading={isLoading}
                isError={error}
              >
                <Popover
                  onOpen={onOpen}
                  onClose={onClose}
                  maxWidth={'224px'}
                  component={
                    <Box opacity={`${isActive ? '1' : '.4'}`}>
                      <HiOutlineDotsVertical
                        color={`${isActive ? '#FD7E50' : 'black'}`}
                        size={'24px'}
                      />
                    </Box>
                  }
                >
                  {!data?.jiraId && (
                    <Text onClick={handleEdit} as={'button'} sx={styles.text}>
                      Edit
                    </Text>
                  )}
                  {data?.jiraId ? (
                    <Text
                      onClick={handleImportTasks}
                      as={'button'}
                      sx={styles.text}
                    >
                      Import subtask
                    </Text>
                  ) : null}
                  <Text sx={styles.text} onClick={handleRemove} as={'button'}>
                    Delete
                  </Text>
                </Popover>
              </RequestHandler>
            ) : null}
          </Flex>
        </Flex>
      </Flex>
      {data.child.map((child) => (
        <IssueCard
          currentIssue={currentIssue}
          isSelectedIssue={isSelectedIssue}
          owner={owner}
          setCurrentIssue={setCurrentIssue}
          isChild
          data={child}
          setIssue={setIssue}
          onHandleOpen={onHandleOpen}
          key={child.id}
          meetingId={meetingId}
        />
      ))}
    </Box>
  );
};

IssueCard.propTypes = {
  data: PropTypes.object.isRequired,
  meetingId: PropTypes.string.isRequired,
  setIssue: PropTypes.func.isRequired,
  onHandleOpen: PropTypes.func.isRequired,
  isChild: PropTypes.bool,
  owner: PropTypes.bool,
  currentIssue: PropTypes.string,
  setCurrentIssue: PropTypes.func.isRequired,
};
