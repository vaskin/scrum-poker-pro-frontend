import { Box, Button, Flex } from '@chakra-ui/react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

import { Modal, RequestHandler, Select } from '../../../../components';
import { useImportFromMeetingMutation } from '../../../../hooks';
import { useGetMeetingsQuery } from '../../../../hooks/useQueries';
import { MeetingAsideImportMeetingModalSelectOption } from './MeetingAsideImportMeetingModalSelectOption';

export const MeetingAsideImportMeetingModal = ({
  isOpen = false,
  onClose,
  meetingId,
}) => {
  const { data, isLoading: isGetMeetingLoading } = useGetMeetingsQuery();
  const { mutateAsync, isLoading: isImportFromMeetingLoading } =
    useImportFromMeetingMutation(meetingId);

  const options = data?.data
    .filter((meeting) => meeting.id !== meetingId)
    .map((meeting) => ({
      label: meeting.name,
      value: meeting.id,
    }));

  const handleFormSubmit = async ({ fromMeetingId }) => {
    await mutateAsync({
      meetingId,
      fromMeetingId,
    });

    onClose();
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={{
        fromMeetingId: null,
      }}
    >
      {({ handleSubmit, values }) => (
        <Modal
          showHeaderBorder={false}
          maxWidth={'650px'}
          title={'Import from other meeting'}
          isButtonClose
          isOpen={isOpen}
          onClose={onClose}
        >
          <RequestHandler height={'10vh'} isLoading={isGetMeetingLoading}>
            <Box
              p={'16px'}
              background={'#FAFAFA'}
              borderRadius={'16px'}
              mb={'180px'}
            >
              <Select
                components={{
                  Option: MeetingAsideImportMeetingModalSelectOption,
                }}
                placeholder={'Meeting'}
                name={'fromMeetingId'}
                options={options}
              />
            </Box>
            <Flex
              direction={{
                sm: 'column-reverse',
                md: 'row',
              }}
            >
              <Box
                maxWidth={{
                  sm: '100%',
                  md: '280px',
                }}
                width={'100%'}
              >
                <Button
                  height={'60px'}
                  onClick={onClose}
                  isFullWidth
                  variant={'outline'}
                >
                  Cancel
                </Button>
              </Box>
              <Box
                ml={{
                  sm: '0',
                  md: '28px',
                }}
                mb={{
                  sm: '10px',
                  md: '0',
                }}
                flexGrow={1}
              >
                <Button
                  height={'60px'}
                  isDisabled={!values.fromMeetingId}
                  onClick={handleSubmit}
                  isFullWidth
                  isLoading={isImportFromMeetingLoading}
                >
                  Import
                </Button>
              </Box>
            </Flex>
          </RequestHandler>
        </Modal>
      )}
    </Formik>
  );
};

MeetingAsideImportMeetingModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  meetingId: PropTypes.string,
};
