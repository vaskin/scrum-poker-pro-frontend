import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { BiCheck } from 'react-icons/all';

import { API } from '../../../../api';
import { ReactComponent as JiraIcon } from '../../../../assets/game/jira.svg';
import { ReactComponent as WhhImportIcon } from '../../../../assets/game/whh_import.svg';
import { Modal, Popover, RequestHandler, Switch } from '../../../../components';
import {
  useImportFromJiraMutation,
  useSetResourcesMutation,
} from '../../../../hooks';
import {
  useGetJiraProjects,
  useGetResourcesQuery,
} from '../../../../hooks/useQueries';
import { MeetingAsideImportJiraModalSearchResult } from './MeetingAsideImportJiraModalSearchResult';
import * as styles from './styles';

export const MeetingAsideImportJiraModal = ({
  isOpen = false,
  onClose,
  meetingId,
}) => {
  const { isLoading, mutateAsync } = useImportFromJiraMutation(meetingId);
  const { isLoading: isProjectsLoading, error } = useGetJiraProjects();

  const handleFormSubmit = async ({ selectedTask }) => {
    await mutateAsync(selectedTask);

    onClose();
  };

  return (
    <Formik
      initialValues={{
        first: true,
        jql: false,
        type: [],
        search: '',
        selectedTask: [],
        tasks: [],
      }}
      onSubmit={handleFormSubmit}
    >
      <Modal
        maxWidth={'552px'}
        isButtonClose
        showHeaderBorder={false}
        title={<GameAsideImportJiraModalHeader isConnected={!error} />}
        isOpen={isOpen}
        onClose={onClose}
      >
        <MeetingAsideImportJiraModalSearchResult
          onHandleClose={onClose}
          isLoading={isProjectsLoading}
          error={error}
          isSubmiting={isLoading}
        />
      </Modal>
    </Formik>
  );
};

MeetingAsideImportJiraModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  meetingId: PropTypes.string.isRequired,
};

const GameAsideImportJiraModalHeader = ({ isConnected = false }) => {
  const { data, error, isLoading, refetch } = useGetResourcesQuery();
  const { mutateAsync, isLoading: isSetResourcesLoading } =
    useSetResourcesMutation();

  const { onClose: onClosePopover, isOpen, onOpen } = useDisclosure();

  const handleLogout = () => {
    window.location.href = API.logoutJira();
  };

  const handleLogin = () => {
    localStorage.setItem('jira', true);
    window.location.href = API.loginWithJira();
  };

  const handleClick = () => {
    if (isConnected) {
      handleLogout();
    } else {
      handleLogin();
    }
  };

  const onClickResource = async (id) => {
    await mutateAsync({ id });

    refetch();
    onClosePopover();
  };

  return (
    <Flex
      direction={{
        sm: 'column',
        md: 'row',
      }}
      justifyContent={'space-between'}
      pr={'24px'}
    >
      <Flex align={'center'}>
        <Text fontSize={'23px'} fontWeight={'900'}>
          Import from{' '}
          <Text fontSize={'23px'} color={'orange.400'} as={'span'}>
            Jira
          </Text>
        </Text>
        <Flex ml={'24px'} align={'center'}>
          <Popover
            onOpen={onOpen}
            onClose={onClosePopover}
            isOpen={isOpen}
            w={'230px'}
            placement={'bottom-start'}
            component={<WhhImportIcon />}
          >
            <RequestHandler
              spinnerSize={'sm'}
              height={'30px'}
              isLoading={isLoading || isSetResourcesLoading}
              isError={error}
            >
              {data?.data?.map((item) => (
                <Flex
                  onClick={() => onClickResource(item?.cloudId)}
                  color={'#111'}
                  _hover={{
                    color: item?.current ? '#111' : '#FD7E50',
                  }}
                  disabled={item?.current}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  w={'100%'}
                  key={item?.cloudId}
                  as={'button'}
                >
                  <Text color={'inherit'} fontWeight={'bold'} fontSize={'18px'}>
                    {item?.name}
                  </Text>
                  {item?.current && <BiCheck />}
                </Flex>
              ))}
            </RequestHandler>
          </Popover>
        </Flex>
      </Flex>
      <Flex
        justify={{
          sm: 'flex-end',
          md: 'initial',
        }}
        align={'center'}
      >
        <Box
          as={'button'}
          onClick={handleClick}
          position={'relative'}
          mr={'32px'}
        >
          <JiraIcon />
          <Box sx={styles.round(isConnected)} />
        </Box>
        <Switch name={'jql'} label={'JQL'} />
      </Flex>
    </Flex>
  );
};

GameAsideImportJiraModalHeader.propTypes = {
  isConnected: PropTypes.bool.isRequired,
};
