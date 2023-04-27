import { Box, Button, Flex, useBreakpointValue } from '@chakra-ui/react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

import { ReactComponent as JiraIcon } from '../../../assets/game/jiraWhite.svg';
import { MeetingStoryPoint } from '../../../components';
import { useUpdateSyncStoryPointMutation } from '../../../hooks';
import { MeetingVotesList } from './MeetingVotesList';

export const MeetingVotes = ({
  votingSystem,
  currentIssue,
  meetingId,
  setCurrentIssue,
  synchronized = false,
  owner,
}) => {
  const isMobile = useBreakpointValue({
    sm: true,
    md: false,
  });
  const show = (isMobile && !currentIssue?.jiraId) || !isMobile;

  const { isLoading, mutateAsync: updateSyncStoryPoint } =
    useUpdateSyncStoryPointMutation(
      currentIssue?.id,
      meetingId,
      setCurrentIssue,
    );

  const handleFormSubmit = (values) => {
    updateSyncStoryPoint({
      fieldId: values?.field?.id,
      schema: values?.field?.schema,
    });
  };

  return (
    <>
      {Object.keys(currentIssue || {}).length ? (
        <Formik initialValues={{ field: {} }} onSubmit={handleFormSubmit}>
          {({ handleSubmit }) => (
            <Flex align={'flex-end'}>
              {!isMobile && currentIssue?.jiraId && owner && (
                <Box mr={'16px'} maxWidth={'200px'}>
                  <MeetingVotesList currentIssue={currentIssue} />
                  <Button
                    fontSize={{
                      md: '16px',
                      lg: '18px',
                    }}
                    isDisabled={!currentIssue?.storyPoint || synchronized}
                    onClick={handleSubmit}
                    isLoading={isLoading}
                    width={'200px'}
                    rightIcon={<JiraIcon />}
                  >
                    Synchronize
                  </Button>
                </Box>
              )}

              {show && (
                <MeetingStoryPoint
                  meetingId={meetingId}
                  setCurrentIssue={setCurrentIssue}
                  currentIssue={currentIssue}
                  votingSystem={votingSystem}
                  owner={owner}
                />
              )}
            </Flex>
          )}
        </Formik>
      ) : null}
    </>
  );
};

MeetingVotes.propTypes = {
  votingSystem: PropTypes.string,
  currentIssue: PropTypes.object,
  meetingId: PropTypes.string.isRequired,
  setCurrentIssue: PropTypes.func.isRequired,
  synchronized: PropTypes.bool,
  owner: PropTypes.bool,
};
