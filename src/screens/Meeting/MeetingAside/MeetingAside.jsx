import { Box, Button, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { GoPlus, RiCloseFill } from 'react-icons/all';

import { ReactComponent as LinesIcon } from '../../../assets/game/lines.svg';
import { ReactComponent as RoundArrowIcon } from '../../../assets/game/round-arrow.svg';
import { IssueCard, Popover } from '../../../components';
import { MeetingAsideImportJiraModal } from './MeetingAsideImportJiraModal/MeetingAsideImportJiraModal';
import { MeetingAsideImportMeetingModal } from './MeetingAsideImportMeetingModal/MeetingAsideImportMeetingModal';
import { MeetingAsideIssuesModal } from './MeetingAsideIssuesModal/MeetingAsideIssuesModal';
import * as styles from './styles';

export const MeetingAside = ({
  data,
  meetingId,
  setCurrentIssue,
  owner,
  isOpen,
  onToggleMenu,
  currentIssue,
}) => {
  const [isModalOpen, setIsModalOpen] = useState({
    importFromMeeting: false,
    importFromJira: localStorage.getItem('jira') || false,
    issues: false,
  });
  const [issue, setIssue] = useState({});
  const [width, setWidth] = useState(0);
  const buttonsWrapperRef = useRef(null);

  const resizeHandler = () => {
    setWidth(buttonsWrapperRef?.current?.offsetWidth);
  };

  useEffect(() => {
    if (buttonsWrapperRef?.current) {
      setWidth(buttonsWrapperRef?.current?.offsetWidth);

      window.addEventListener('resize', resizeHandler);
    }

    return () => window.removeEventListener('resize', resizeHandler);
  }, [owner]);

  const handleModalOpen = (modal) => {
    setIsModalOpen({
      importFromGroup: false,
      importFromJira: false,
      issues: false,
      [modal]: true,
    });
  };

  const onHandleModalClose = (modal) => {
    setIsModalOpen({
      importFromGroup: false,
      importFromJira: false,
      issues: false,
      [modal]: false,
    });
  };

  return (
    <Flex sx={styles.aside(isOpen)}>
      <Flex
        mb={'25px'}
        justify={'space-between'}
        align={{
          sm: 'flex-start',
          md: 'center',
        }}
      >
        <Box>
          <Text fontWeight={'bold'}>Issues</Text>
          {/*{isMobile && (*/}
          {/*  <Flex sx={styles.headerText}>*/}
          {/*    <JiraIcon />*/}
          {/*    <Text ml={'12px'} opacity={'.32'}>*/}
          {/*      Synchronize with Jira*/}
          {/*    </Text>*/}
          {/*  </Flex>*/}
          {/*)}*/}
        </Box>
        <Flex align={'center'}>
          {/*{!isMobile && (*/}
          {/*  <Flex sx={styles.headerText}>*/}
          {/*    <JiraIcon />*/}
          {/*    <Text ml={'12px'} opacity={'.32'}>*/}
          {/*      Synchronize with Jira*/}
          {/*    </Text>*/}
          {/*  </Flex>*/}
          {/*)}*/}
          <Box onClick={onToggleMenu} ml={'64px'} as={'button'}>
            <RiCloseFill size={'16px'} />
          </Box>
        </Flex>
      </Flex>
      <Box
        width={{
          sm: 'auto',
          md: '538px',
        }}
        pr={{
          sm: '22px',
          md: '16px',
        }}
        mr={{
          sm: '-22px',
        }}
        height={'100%'}
        overflow={'auto'}
        overflowX={'hidden'}
      >
        <Box>
          {data?.data.map((issue) => (
            <IssueCard
              owner={owner}
              setCurrentIssue={setCurrentIssue}
              currentIssue={currentIssue?.id}
              onHandleOpen={() => handleModalOpen('issues')}
              setIssue={setIssue}
              meetingId={meetingId}
              key={issue.id}
              data={issue}
            />
          ))}

          {!data?.data.length ? (
            <Text fontWeight={'bold'} opacity={'.28'} fontSize={'20px'}>
              You have no tasks yet
            </Text>
          ) : null}
        </Box>
      </Box>
      {owner ? (
        <Flex
          direction={{
            sm: 'column',
            md: 'row',
          }}
        >
          <Box
            ref={buttonsWrapperRef}
            maxWidth={{
              sm: '100%',
              md: '220px',
            }}
            width={'100%'}
          >
            <Button
              height={'60px'}
              onClick={() => handleModalOpen('issues')}
              leftIcon={<GoPlus />}
              isFullWidth
            >
              Add new issue
            </Button>
          </Box>
          <Box
            mt={{
              sm: '8px',
              md: '0',
            }}
            ml={{
              sm: 0,
              md: '16px',
            }}
            flexGrow={1}
          >
            <Popover
              width={{
                sm: width,
                md: '299px',
              }}
              right={{
                sm: '0',
                md: '2px',
              }}
              component={
                <Button height={'60px'} isFullWidth>
                  Import
                </Button>
              }
            >
              <Box>
                <Text
                  onClick={() => handleModalOpen('importFromJira')}
                  mb={'16px'}
                  width={'100%'}
                  textAlign={'left'}
                  fontWeight={'700'}
                  as={'button'}
                  _hover={{
                    color: '#FD7E50',
                  }}
                >
                  Import from Jira
                </Text>
                <Text
                  width={'100%'}
                  textAlign={'left'}
                  onClick={() => handleModalOpen('importFromMeeting')}
                  fontWeight={'700'}
                  as={'button'}
                  _hover={{
                    color: '#FD7E50',
                  }}
                >
                  Import from other meeting
                </Text>
              </Box>
            </Popover>
          </Box>
        </Flex>
      ) : null}
      <Flex as={'button'} onClick={onToggleMenu} sx={styles.asideButton}>
        <Box opacity={'.32'}>
          <LinesIcon />
        </Box>
      </Flex>
      {!isOpen && (
        <Flex
          direction={{
            md: 'column',
            xl: 'row',
          }}
          alignItems={{
            md: 'flex-start',
            xl: 'center',
          }}
          as={'button'}
          onClick={onToggleMenu}
          align={'center'}
          sx={styles.issueButton}
        >
          <RoundArrowIcon />
          <Text
            color={'#FD7E50'}
            ml={{
              md: '0',
              xl: '8px',
            }}
            fontWeight={'bold'}
          >
            Issues
          </Text>
        </Flex>
      )}
      {isModalOpen.importFromMeeting && (
        <MeetingAsideImportMeetingModal
          isOpen={isModalOpen.importFromMeeting}
          onClose={() => onHandleModalClose('importFromMeeting')}
          meetingId={meetingId}
        />
      )}
      {isModalOpen.importFromJira && (
        <MeetingAsideImportJiraModal
          meetingId={meetingId}
          isOpen={isModalOpen.importFromJira}
          onClose={() => {
            onHandleModalClose('importFromJira');

            if (localStorage.getItem('jira')) {
              localStorage.removeItem('jira');
            }
          }}
        />
      )}
      {isModalOpen.issues && (
        <MeetingAsideIssuesModal
          issue={issue}
          meetingId={meetingId}
          isOpen={isModalOpen.issues}
          onClose={() => {
            onHandleModalClose('issues');
            setIssue({});
          }}
        />
      )}
    </Flex>
  );
};

MeetingAside.propTypes = {
  data: PropTypes.object,
  meetingId: PropTypes.string.isRequired,
  setCurrentIssue: PropTypes.func.isRequired,
  owner: PropTypes.bool,
  onToggleMenu: PropTypes.func,
  isOpen: PropTypes.bool,
  currentIssue: PropTypes.object,
};
