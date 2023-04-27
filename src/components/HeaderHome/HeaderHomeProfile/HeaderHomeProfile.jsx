import { Avatar, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { AiOutlineEdit, RiDoorClosedLine } from 'react-icons/all';

import UserService from '../../../services/UserService';
import { Popover } from '../../Popover/Popover';
import * as styles from '../styles';
import { HeaderHomeProfileModal } from './HeaderHomeProfileModal';

export const HeaderHomeProfile = ({ profile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutClick = () => {
    UserService.doLogout();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isMobile = useBreakpointValue({ sm: false, md: true });

  return (
    <Flex alignItems={'center'}>
      {isMobile && <Text css={styles.name}>{profile?.name}</Text>}
      <Popover
        css={styles.popover}
        component={
          <Avatar
            name=''
            src={`data:${profile?.contentType};base64,${profile?.avatar}`}
          />
        }
      >
        <Flex as={'button'} onClick={handleOpenModal} css={styles.popoverItem}>
          <AiOutlineEdit size={'24px'} />
          <Text css={styles.popoverText}>Edit profile</Text>
        </Flex>
        <Flex css={styles.popoverItem} onClick={handleLogoutClick}>
          <RiDoorClosedLine color={'#FD7E50'} size={'24px'} />
          <Text fontWeight={'bold'} css={styles.popoverText}>
            Log out
          </Text>
        </Flex>
      </Popover>
      <HeaderHomeProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        profile={profile}
      />
    </Flex>
  );
};

HeaderHomeProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};
