import { Box, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { BiCheck } from 'react-icons/all';

import * as styles from './styles';

export const MeetingAsideIssuesModalSelectOption = ({
  innerProps,
  isDisabled,
  data,
  isSelected,
}) => {
  return !isDisabled ? (
    <Flex justify={'space-between'} css={styles.option} {...innerProps}>
      <Flex align={'center'}>
        {data.icon}
        <Text ml={'8px'} fontSize={'18px'} fontWeight={'bold'} color={'#111'}>
          {data.label}
        </Text>
      </Flex>
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

MeetingAsideIssuesModalSelectOption.propTypes = {
  innerProps: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
