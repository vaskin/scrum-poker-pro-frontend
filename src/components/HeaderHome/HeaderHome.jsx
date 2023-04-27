import { Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import { ROUTES } from '../../constants';
import { HeaderHomeProfile } from './HeaderHomeProfile/HeaderHomeProfile';

export const HeaderHome = ({ profile }) => {
  return (
    <Flex justifyContent={'space-between'} mt={'24px'}>
      <Flex alignItems={'center'}>
        <NavLink to={ROUTES.home}>
          <LogoIcon />
        </NavLink>
      </Flex>
      <HeaderHomeProfile profile={profile} />
    </Flex>
  );
};

HeaderHome.propTypes = {
  profile: PropTypes.object,
};
