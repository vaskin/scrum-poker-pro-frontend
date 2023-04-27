import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import { ReactComponent as CopyIcon } from '../../../../assets/game/copy.svg';
import { useSendInviteMutation } from '../../../../hooks';
import { useGetGroupsQuery } from '../../../../hooks/useQueries';
import { Input } from '../../../Input/Input';
import { Modal } from '../../../Modal/Modal';
import { RequestHandler } from '../../../RequestHandler/RequestHandler';
import { Select } from '../../../Select/Select';
import { HeaderMeetingInviteModalSelectOption } from './HeaderMeetingInviteModalSelectOption';

export const HeaderMeetingInviteModal = ({
  onHandleGroupModalOpen,
  isOpen = false,
  onClose,
  meetingId,
  setGroup,
}) => {
  const { isLoading: isGroupsLoading, data: groupsData } = useGetGroupsQuery();
  const { isLoading: isInviteLoading, mutateAsync: sendInvite } =
    useSendInviteMutation();
  const inputRef = useRef(null);

  const options = groupsData?.data?.map((group) => ({
    value: group.id,
    label: group.name,
    group: group,
  }));

  const handleFormSubmit = async ({ groupInviteId }) => {
    await sendInvite({
      groupInviteId,
      meetingId,
    });

    onClose();
  };

  const copyLink = () => {
    const link = inputRef?.current;
    const range = document.createRange();

    range.selectNode(link);

    const selection = window.getSelection();

    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand('copy');
    } catch (err) {
      alert('Oops, unable to copy');
    }

    selection.removeAllRanges();
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
      title={'Invite users'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <RequestHandler height={'10vh'} isLoading={isGroupsLoading}>
        <Box pb={'8px'}>
          <Formik
            initialValues={{
              link: window.location.origin + window.location.pathname,
            }}
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
                    readonly
                    flexGrow={'1'}
                    isFullWidth
                    placeholder={'Link'}
                    name={'link'}
                  />
                  <IconButton
                    onClick={copyLink}
                    ml={{
                      sm: '8px',
                      md: '26px',
                    }}
                    maxWidth={'56px'}
                    width={'100%'}
                    height={'56px'}
                    borderRadius={'8px'}
                    aria-label={'copy'}
                    icon={<CopyIcon />}
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
                        <HeaderMeetingInviteModalSelectOption
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
                  isDisabled={!values.groupInviteId}
                  isLoading={isInviteLoading}
                  mt={'32px'}
                  isFullWidth
                  onClick={handleSubmit}
                >
                  Invite group of users
                </Button>
              </>
            )}
          </Formik>
        </Box>
      </RequestHandler>
    </Modal>
  );
};

HeaderMeetingInviteModal.propTypes = {
  onHandleGroupModalOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  meetingId: PropTypes.string,
  setGroup: PropTypes.func.isRequired,
};
