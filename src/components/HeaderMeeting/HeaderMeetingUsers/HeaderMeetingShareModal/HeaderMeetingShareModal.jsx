import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import { useShareResultMutation } from '../../../../hooks';
import { useGetGroupsQuery } from '../../../../hooks/useQueries';
import { shareSchema } from '../../../../services/validation';
import { Input } from '../../../Input/Input';
import { Modal } from '../../../Modal/Modal';
import { RequestHandler } from '../../../RequestHandler/RequestHandler';
import { Select } from '../../../Select/Select';
import { HeaderMeetingShareModalSelectOption } from './HeaderMeetingShareModalSelectOption';

export const HeaderMeetingShareModal = ({
  onHandleGroupModalOpen,
  isOpen = false,
  onClose,
  meetingId,
  setGroup,
}) => {
  const { isLoading: isGroupsLoading, data: groupsData } = useGetGroupsQuery();
  const { isLoading: isSharing, mutateAsync: share } = useShareResultMutation();

  const inputRef = useRef(null);

  const options = groupsData?.data?.map((group) => ({
    value: group.id,
    label: group.name,
    group: group,
  }));

  const handleFormSubmit = async ({ email, groupInviteId }) => {
    await share({
      email,
      groupInviteId,
      meetingId,
    });

    onClose();
  };

  options?.push({
    component: (
      <Text
        pb={'8px'}
        pt={'2px'}
        px={{
          sm: '16px',
          md: '0',
        }}
        textAlign={{
          sm: 'left',
          md: 'center',
        }}
      >
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Din't find the group you were looking for?{' '}
        <Button
          fontSize={'18px'}
          onClick={onHandleGroupModalOpen}
          variant={'link'}
        >
          Create a new
        </Button>
      </Text>
    ),
  });

  return (
    <Modal
      maxWidth={'600px'}
      isButtonClose
      title={'Share result'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <RequestHandler height={'10vh'} isLoading={isGroupsLoading}>
        <Box pb={'8px'}>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={shareSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, handleSubmit }) => (
              <>
                <Flex
                  mt={'16px'}
                  align={'center'}
                  justify={'space-between'}
                  width={'100%'}
                >
                  <Input
                    ref={inputRef}
                    flexGrow={'1'}
                    isFullWidth
                    placeholder={'Email'}
                    name={'email'}
                  />
                </Flex>
                <Text
                  my={'16px'}
                  color={'#868686'}
                  fontSize={'18px'}
                  fontWeight={'bold'}
                  textAlign={'center'}
                >
                  OR
                </Text>
                <Flex>
                  <Select
                    components={{
                      // eslint-disable-next-line react/display-name
                      Option: (props) => (
                        <HeaderMeetingShareModalSelectOption
                          setGroup={setGroup}
                          handleGroupModalOpen={onHandleGroupModalOpen}
                          {...props}
                        />
                      ),
                    }}
                    placeholder={'Group'}
                    name={'groupInviteId'}
                    options={options}
                  />
                </Flex>
                <Button
                  height={'60px'}
                  isDisabled={!values.groupInviteId && !values.email.trim()}
                  isLoading={isSharing}
                  mt={'32px'}
                  isFullWidth
                  onClick={handleSubmit}
                >
                  Share result
                </Button>
              </>
            )}
          </Formik>
        </Box>
      </RequestHandler>
    </Modal>
  );
};

HeaderMeetingShareModal.propTypes = {
  onHandleGroupModalOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  meetingId: PropTypes.string,
  setGroup: PropTypes.func.isRequired,
};
