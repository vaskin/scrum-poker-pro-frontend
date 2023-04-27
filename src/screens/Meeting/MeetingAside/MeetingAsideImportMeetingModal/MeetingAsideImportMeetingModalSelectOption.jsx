import { Box, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { BiCheck } from 'react-icons/all';

import * as styles from './styles';

export const MeetingAsideImportMeetingModalSelectOption = ({
  innerProps,
  isDisabled,
  data,
  isSelected,
}) => {
  return !isDisabled ? (
    <Flex css={styles.option} {...innerProps}>
      <Text fontSize={'18px'} fontWeight={'bold'} color={'#111'}>
        {data.label}
      </Text>
      <Flex>
        {isSelected && (
          <Box>
            <BiCheck size={'24px'} />
          </Box>
        )}
      </Flex>
    </Flex>
  ) : null;
};

MeetingAsideImportMeetingModalSelectOption.propTypes = {
  innerProps: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
