import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { BiSearch, BiTrash } from 'react-icons/all';

import { API } from '../../../../api';
import { ReactComponent as ErrorCircleIcon } from '../../../../assets/game/error-circle.svg';
import { Checkbox, RequestHandler } from '../../../../components';
import { useGetJiraProjectsQuery } from '../../../../hooks/useQueries';
import * as styles from './styles';

export const MeetingAsideImportJiraModalSearchResult = ({
  isLoading = true,
  error,
  isSubmiting,
  onHandleClose,
}) => {
  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext();
  const [isButtonShow, setButtonShow] = useState(values.search);

  const {
    data,
    refetch,
    isLoading: isProjectsLoading,
    error: projectsError,
  } = useGetJiraProjectsQuery({
    search: values.search,
    jql: values.first || values.jql,
  });
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClick = () => {
    localStorage.setItem('jira', true);
    window.location.href = API.loginWithJira();
  };

  const handleRemoveSearchText = () => {
    setButtonShow(true);
    setFieldValue('first', false);
    setFieldValue('search', '');
  };

  useEffect(() => {
    setButtonShow(true);
    refetch().then(() => {
      setButtonShow(false);
    });
  }, [refetch, values.jql]);

  const handleCheckboxChange = (event, task) => {
    if (event.target.checked) {
      setFieldValue('selectedTask', [...values.selectedTask, task]);
    } else {
      setFieldValue(
        'selectedTask',
        values.selectedTask.filter(
          (selectedTask) => selectedTask.id !== task.id,
        ),
      );
    }
  };

  const handleSearch = async () => {
    setFieldValue('first', false);

    setTimeout(() => {
      refetch({
        search: values.search,
        jql: values.jql,
      }).then(() => {
        setButtonShow(false);
      });
    }, 0);
  };

  const handleSearchKeyPress = (event) => {
    if (event.code === 'Enter') {
      handleSearch();
    }
  };

  return (
    <RequestHandler height={'10vh'} isLoading={isLoading}>
      {!(error && error?.response?.status === 403) ? (
        <>
          <Box height={'320px'} mx={'-12px'} px={'12px'} overflow={'auto'}>
            <Box
              py={'5px'}
              width={'100%'}
              mb={'24px'}
              position={'sticky'}
              top={0}
              zIndex={3}
              bg={'#fff'}
            >
              <Box width={'100%'} position={'relative'}>
                <Box css={styles.searchIcon(isFocused)}>
                  <BiSearch
                    color={isFocused ? '#FD7E50' : '#0F1322'}
                    size={'24px'}
                  />
                </Box>
                <Input
                  onKeyDown={handleSearchKeyPress}
                  fontWeight={'bold'}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  px={'40px'}
                  onChange={(event) => {
                    setButtonShow(true);
                    handleChange(event);
                  }}
                  name={'search'}
                  value={values.search}
                  css={styles.input}
                  placeholder={'Search issues'}
                />
                <Box
                  as={'button'}
                  onClick={handleRemoveSearchText}
                  css={styles.trash}
                >
                  <BiTrash size={'24px'} />
                </Box>
              </Box>
              {/*{!values.jql && (*/}
              {/*  <Flex alignItems={'center'}>*/}
              {/*    <Popover*/}
              {/*      borderColor={'#B8B8B8'}*/}
              {/*      maxWidth={'252px'}*/}
              {/*      component={*/}
              {/*        <AiOutlineFilter size={'24px'} color={'#FD7E50'} />*/}
              {/*      }*/}
              {/*    >*/}
              {/*      <MeetingAsideImportJiraModalFilter />*/}
              {/*    </Popover>*/}
              {/*  </Flex>*/}
              {/*)}*/}
              {isButtonShow && (
                <Button
                  isLoading={isProjectsLoading}
                  onClick={handleSearch}
                  mt={'10px'}
                  isFullWidth
                  variant={'outline'}
                >
                  Search
                </Button>
              )}
            </Box>
            {projectsError ? (
              <Flex mb={'125px'} direction={'column'} align={'center'}>
                <Box mb={'16px'}>
                  <ErrorCircleIcon />
                </Box>
                <Text
                  textAlign={'center'}
                  fontSize={'23px'}
                  mx={'auto'}
                  mb={'5px'}
                >
                  {projectsError?.response?.data?.detail}
                </Text>
              </Flex>
            ) : (
              data?.data.map((task) => {
                return (
                  <Flex
                    justify={'space-between'}
                    alignItems={'center'}
                    mb={'16px'}
                    key={task.id}
                  >
                    <Box width={'90%'}>
                      <Checkbox
                        isChecked={values.tasks.includes(task.id)}
                        onHandleChange={(event) =>
                          handleCheckboxChange(event, task)
                        }
                        variant={'orange'}
                        alignItems={'flex-end'}
                        name={'tasks'}
                        value={task.id}
                      >
                        <a target='_blank' href={task?.link} rel='noreferrer'>
                          <Text mb={'2px'} fontSize={'12px'}>
                            {task.key}
                          </Text>
                        </a>
                        <Text
                          wordBreak={'break-word'}
                          lineHeight={'1.1'}
                          fontWeight={'bold'}
                        >
                          {task.title}
                        </Text>
                      </Checkbox>
                    </Box>

                    <img src={task.iconUrl} alt={'icon'} />
                  </Flex>
                );
              })
            )}
          </Box>
        </>
      ) : (
        <Flex mb={'125px'} direction={'column'} align={'center'}>
          <Box mb={'16px'}>
            <ErrorCircleIcon />
          </Box>
          <Text
            textAlign={'center'}
            fontSize={'23px'}
            maxWidth={'342px'}
            mx={'auto'}
            mb={'5px'}
          >
            To import issues from JIra,{' '}
            <Text
              textDecoration={'underline'}
              cursor={'pointer'}
              fontSize={'23px'}
              as={'span'}
              onClick={handleClick}
            >
              Connect to Jira
            </Text>
          </Text>
        </Flex>
      )}
      <Flex justify={'space-between'} align={'center'}>
        <Button
          onClick={onHandleClose}
          height={'60px'}
          color={'black'}
          variant={'ghost'}
        >
          Cancel
        </Button>
        <Button
          ml={'16px'}
          onClick={handleSubmit}
          width={'100%'}
          maxWidth={'240px'}
          isLoading={isSubmiting}
        >
          Save
        </Button>
      </Flex>
    </RequestHandler>
  );
};

MeetingAsideImportJiraModalSearchResult.propTypes = {
  isSubmiting: PropTypes.bool.isRequired,
  onHandleClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};
