import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { BiTrash } from 'react-icons/all';

import { ReactComponent as ErrorIcon } from '../../../../assets/game/error.svg';
import { ReactComponent as StoryIcon } from '../../../../assets/game/story.svg';
import { ReactComponent as TaskIcon } from '../../../../assets/game/task.svg';
import { Input, Modal, Select, Textarea } from '../../../../components';
import { TYPES } from '../../../../constants';
import {
  useCreateOrUpdateIssueMutation,
  useDeleteIssueMutation,
} from '../../../../hooks';
import { MeetingAsideIssuesModalSelectOption } from './MeetingAsideIssuesModalSelectOption';
import * as styles from './styles';

const options = [
  {
    value: TYPES.TASK,
    label: 'Task',
    icon: <TaskIcon />,
  },
  {
    value: TYPES.STORY,
    label: 'Story',
    icon: <StoryIcon />,
  },
  {
    value: TYPES.BUG,
    label: 'Error',
    icon: <ErrorIcon />,
  },
];

export const MeetingAsideIssuesModal = ({
  onClose,
  isOpen,
  meetingId,
  issue,
}) => {
  const { isLoading, mutateAsync } = useCreateOrUpdateIssueMutation(
    meetingId,
    issue?.id,
  );
  const { mutateAsync: deleteIssue, isLoading: isDeleteIssueLoading } =
    useDeleteIssueMutation(issue?.id, meetingId);

  const hasIssue = Object.keys(issue).length;

  const defaultSelectValue = hasIssue
    ? options.find((option) => option.value === issue.type)
    : options[0];

  const handleRemove = async () => {
    await deleteIssue();

    onClose();
  };

  const handleSubmitForm = async (values, { resetForm }) => {
    await mutateAsync(values);

    resetForm();
    onClose();
  };

  return (
    <Formik
      initialValues={{
        title: issue?.title || '',
        link: issue?.link || '',
        description: issue?.description || '',
        type: issue?.type || options[0].value,
      }}
      onSubmit={handleSubmitForm}
    >
      {({ handleSubmit }) => (
        <Modal
          maxWidth={'650px'}
          showHeaderBorder={false}
          title={hasIssue ? 'Edit issues' : 'Add issues'}
          isButtonClose
          onClose={onClose}
          isOpen={isOpen}
        >
          <Box css={styles.wrapper}>
            <Box position={'relative'} zIndex={'4'} mb={'24px'}>
              <Select
                withTitle={false}
                defaultValue={defaultSelectValue}
                isClearable={false}
                components={{ Option: MeetingAsideIssuesModalSelectOption }}
                getOptionLabel={(option) => (
                  <Flex align={'center'}>
                    {option.icon}
                    <Text opacity={'.32'} ml={'8px'}>
                      {option.label}
                    </Text>
                  </Flex>
                )}
                options={options}
                name={'type'}
              />
            </Box>
            <Box mb={'24px'}>
              <Input name={'title'} placeholder={'Title'} />
            </Box>
            <Box mb={'24px'}>
              <Input name={'link'} placeholder={'Link'} />
            </Box>
            <Box>
              <Textarea placeholder={'Description'} name={'description'} />
            </Box>
          </Box>
          <Flex
            direction={{
              sm: 'column-reverse',
              md: 'row',
            }}
            align={'center'}
            pb={'14px'}
            justify={'space-between'}
          >
            {hasIssue ? (
              <Button
                isLoading={isDeleteIssueLoading}
                variant={'ghost'}
                mt={{
                  sm: '10px',
                  md: '0',
                }}
                mr={{
                  sm: 0,
                  md: '30px',
                }}
                onClick={handleRemove}
              >
                <Box opacity={'.32'}>
                  <BiTrash color={'#000'} size={'24px'} />
                </Box>
              </Button>
            ) : null}
            <Button
              width={{
                sm: '100%',
                md: 'auto',
              }}
              onClick={onClose}
              flexGrow={{
                sm: 1,
                md: 0.8,
              }}
              variant={'outline'}
              height={'60px'}
            >
              Cancel
            </Button>
            <Button
              width={{
                sm: '100%',
                md: 'auto',
              }}
              height={'60px'}
              isDisabled={isDeleteIssueLoading}
              isLoading={isLoading}
              onClick={handleSubmit}
              ml={{
                sm: 0,
                md: '28px',
              }}
              flexGrow={1}
              mb={{
                sm: '10px',
                md: '0',
              }}
            >
              Save
            </Button>
          </Flex>
        </Modal>
      )}
    </Formik>
  );
};

MeetingAsideIssuesModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  meetingId: PropTypes.string.isRequired,
  issue: PropTypes.object.isRequired,
};
