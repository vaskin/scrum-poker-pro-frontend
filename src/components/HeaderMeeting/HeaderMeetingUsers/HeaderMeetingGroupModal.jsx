import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { FieldArray, Formik, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/all';

import { ReactComponent as PlaneIcon } from '../../../assets/game/plane.svg';
import {
  useCreateOrUpdateGroupMutation,
  useSendInviteMutation,
} from '../../../hooks';
import { createGroupSchema } from '../../../services/validation';
import { GroupItem } from '../../GroupItem/GroupItem';
import { Input } from '../../Input/Input';
import { Modal } from '../../Modal/Modal';
import * as styles from './styles';

export const HeaderMeetingGroupModal = ({
  isOpen = false,
  onClose,
  meetingId,
  group,
  setGroup,
  onInviteModalOpen,
}) => {
  const {
    isLoading: isCreateOrUpdateGroupLoading,
    mutateAsync: createOrUpdateGroup,
  } = useCreateOrUpdateGroupMutation(group?.id);
  const { isLoading: isInviteLoading, mutateAsync: sendInvite } =
    useSendInviteMutation();

  const handleFormSubmit = async ({ emails, name }) => {
    await createOrUpdateGroup({
      emails,
      name,
    });

    if (Object.keys(group).length) {
      setGroup({});
    }

    onInviteModalOpen();
  };

  const handleClick = async (email, push, setFieldValue) => {
    await sendInvite({
      email,
      meetingId,
    });

    setFieldValue('email', '');
    push(email);
  };

  return (
    <Formik
      validationSchema={createGroupSchema}
      initialValues={{
        emails: group?.emails || [],
        email: '',
        name: group?.name || 'Group name',
      }}
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit, values, errors, setFieldValue }) => (
        <Modal
          isOpen={isOpen}
          maxWidth={'600px'}
          isButtonClose
          title={<HeaderGameGroupModalHead />}
          onClose={onClose}
        >
          <FieldArray
            name={'emails'}
            render={({ push, remove }) => (
              <Box
                pb={{
                  sm: '0',
                  md: '12px',
                }}
              >
                <Box height={'328px'} mb={'32px'}>
                  <Box
                    mx={{
                      sm: '-16px',
                      md: '-25px',
                    }}
                    maxHeight={{
                      sm: 'calc(100% - 120px)',
                      md: 'calc(100% - 69px)',
                    }}
                    overflow={'auto'}
                  >
                    {values.emails.map((email, index) => (
                      <GroupItem
                        email={email}
                        key={index}
                        onClick={() => remove(index)}
                      />
                    ))}
                  </Box>
                  <Flex
                    box-shadow={'0px 4px 32px rgba(0, 0, 0, 0.25)'}
                    mx={'-16px'}
                    px={{
                      sm: '8px',
                      md: '26px',
                    }}
                    pt={'16px'}
                    direction={{
                      sm: 'column',
                      md: 'row',
                    }}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                  >
                    <Box width={'100%'}>
                      <Input
                        showError={false}
                        isFullWidth
                        name={'email'}
                        type={'email'}
                        placeholder={'Email'}
                      />
                    </Box>
                    <Button
                      isLoading={isInviteLoading}
                      sx={styles.sendButton}
                      isDisabled={
                        !values.email.trim().length || Boolean(errors.email)
                      }
                      leftIcon={<PlaneIcon />}
                      isFullWidth
                      onClick={() =>
                        handleClick(values.email, push, setFieldValue)
                      }
                    >
                      Send
                    </Button>
                  </Flex>
                </Box>
                <Flex
                  mx={{
                    sm: '-16px',
                    md: '0',
                  }}
                  px={{
                    sm: '8px',
                    md: '0',
                  }}
                >
                  <Button
                    onClick={onInviteModalOpen}
                    variant={'outline'}
                    sx={styles.cancleButton}
                  >
                    Cancel
                  </Button>
                  <Button
                    height={'60px'}
                    isDisabled={!values.emails.length}
                    isLoading={isCreateOrUpdateGroupLoading || isInviteLoading}
                    onClick={handleSubmit}
                    ml={'16px'}
                    flexGrow={1}
                  >
                    Save group
                  </Button>
                </Flex>
              </Box>
            )}
          />
        </Modal>
      )}
    </Formik>
  );
};

HeaderMeetingGroupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  meetingId: PropTypes.string,
  group: PropTypes.object,
  setGroup: PropTypes.func.isRequired,
  onInviteModalOpen: PropTypes.func.isRequired,
};

const HeaderGameGroupModalHead = () => {
  const { values } = useFormikContext();
  const [isEditable, setIsEditable] = useState(false);

  const handleClickEditEnable = () => {
    setIsEditable(true);
  };

  const handleClickEditDisable = () => {
    setIsEditable(false);
  };

  if (isEditable) {
    return (
      <Flex>
        <Input name={'name'} placeholder={'Group name'} />
        <Button
          ml={'15px'}
          width={'160px'}
          height={'56px'}
          onClick={handleClickEditDisable}
        >
          save
        </Button>
      </Flex>
    );
  }

  return (
    <Flex>
      <Flex align={'center'}>
        <Text>{values.name}</Text>
        <Box
          onClick={handleClickEditEnable}
          ml={'4px'}
          as={'button'}
          opacity={'.32'}
        >
          <AiOutlineEdit size={'24px'} />
        </Box>
      </Flex>
    </Flex>
  );
};
