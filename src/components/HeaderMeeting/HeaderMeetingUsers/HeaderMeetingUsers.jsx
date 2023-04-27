import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  FiUserPlus,
  GrShareOption,
  HiOutlineDotsVertical,
} from 'react-icons/all';
import { useHistory } from 'react-router-dom';

import { ReactComponent as LogoutIcon } from '../../../assets/game/logout.svg';
import { ROUTES } from '../../../constants';
import { Popover } from '../../Popover/Popover';
import { HeaderMeetingGroupModal } from './HeaderMeetingGroupModal';
import { HeaderMeetingInviteModal } from './HeaderMeetingInviteModal/HeaderMeetingInviteModal';
import { HeaderMeetingShareModal } from './HeaderMeetingShareModal/HeaderMeetingShareModal';
import * as styles from './styles';

export const HeaderMeetingUsers = ({
  meetingParticipants,
  meetingId,
  owner,
  share = false,
}) => {
  const history = useHistory();
  const variant = useBreakpointValue({ lg: 'Invite users', md: '' });
  const variantGroup = useBreakpointValue({ lg: 'Share result', md: '' });
  const isShowUsers = useBreakpointValue({ sm: false, base: true, md: true });
  const isMobile = useBreakpointValue({ sm: true, md: false, lg: false });
  const { onOpen, onClose, isOpen } = useDisclosure();

  const [prevModal, setPrevModal] = useState('');
  const [isModalOpen, setIsModalOpen] = useState({
    invite: false,
    group: false,
    share: false,
  });
  const [group, setGroup] = useState({});

  const handleModalOpen = (modal) => {
    setIsModalOpen({
      invite: false,
      group: false,
      share: false,
      [modal]: true,
    });
  };

  const onHandleModalClose = (modal) => {
    setIsModalOpen({
      invite: false,
      group: false,
      share: false,
      [modal]: false,
    });
  };

  const handleClick = () => {
    history.push(ROUTES.home);
  };

  return (
    <>
      {share && isMobile ? (
        <Popover
          onOpen={onOpen}
          onClose={onClose}
          maxWidth={'224px'}
          component={
            <Box opacity={'.32'}>
              <HiOutlineDotsVertical
                color={isOpen ? '#FD7E50' : 'black'}
                size={'24px'}
              />
            </Box>
          }
        >
          {owner && (
            <>
              <Text
                mb={'10px'}
                sx={styles.text}
                onClick={() => {
                  handleModalOpen('share');
                }}
                as={'button'}
              >
                Share result
              </Text>
              <Text
                mb={'10px'}
                onClick={() => handleModalOpen('invite')}
                sx={styles.text}
                as={'button'}
              >
                Invite
              </Text>
            </>
          )}
          <Text onClick={handleClick} sx={styles.text} as={'button'}>
            Quit meeting
          </Text>
        </Popover>
      ) : (
        <Flex css={styles.wrapper}>
          {owner && share && (
            <Flex
              as={'button'}
              onClick={() => handleModalOpen('share')}
              mr={'48px'}
              align={'center'}
            >
              <GrShareOption size={24} />
              <Text
                ml={'8px'}
                color={'#0F1322'}
                fontSize={18}
                fontWeight={'bold'}
              >
                {variantGroup}
              </Text>
            </Flex>
          )}
          <Flex align={'center'}>
            {isShowUsers && (
              <>
                {meetingParticipants.length >= 4 && (
                  <Text opacity={'.4'} fontWeight={'bold'}>
                    + {meetingParticipants.length}
                  </Text>
                )}
                <Flex ml={'8px'} mr={'60px'}>
                  {meetingParticipants.slice(0, 4).map((user) => (
                    <Avatar
                      key={user.userId}
                      css={styles.avatar}
                      src={`data:${user.contentType};base64,${user.avatar}`}
                    />
                  ))}
                </Flex>
              </>
            )}
          </Flex>
          {owner ? (
            <Flex
              align={'center'}
              width={'100%'}
              maxWidth={{
                sm: '48px',
                md: '60px',
                lg: '225px',
              }}
            >
              <Button
                onClick={() => handleModalOpen('invite')}
                isFullWidth
                colorScheme={'orange'}
                leftIcon={<FiUserPlus color={'#fff'} size={'24px'} />}
              >
                {variant}
              </Button>
            </Flex>
          ) : null}

          <Box onClick={handleClick} ml={'24px'} as={'button'}>
            <LogoutIcon />
          </Box>
        </Flex>
      )}
      <HeaderMeetingInviteModal
        setGroup={setGroup}
        meetingId={meetingId}
        isOpen={isModalOpen.invite}
        onClose={() => onHandleModalClose('invite')}
        onHandleGroupModalOpen={() => {
          setPrevModal('invite');
          handleModalOpen('group');
        }}
      />
      <HeaderMeetingShareModal
        setGroup={setGroup}
        meetingId={meetingId}
        isOpen={isModalOpen.share}
        onClose={() => onHandleModalClose('share')}
        onHandleGroupModalOpen={() => {
          setPrevModal('share');
          handleModalOpen('group');
        }}
      />
      {isModalOpen.group && (
        <HeaderMeetingGroupModal
          group={group}
          setGroup={setGroup}
          meetingId={meetingId}
          isOpen={isModalOpen.group}
          onInviteModalOpen={() => {
            handleModalOpen(prevModal);
            setGroup({});
          }}
          onClose={() => {
            onHandleModalClose('group');
            setGroup({});
          }}
        />
      )}
    </>
  );
};

HeaderMeetingUsers.propTypes = {
  meetingParticipants: PropTypes.array.isRequired,
  meetingId: PropTypes.string,
  owner: PropTypes.bool,
  share: PropTypes.bool,
};
