import { Box, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { AiOutlineEdit, BiCheck, BiTrash } from 'react-icons/all';

import { useRemoveGroupMutation } from '../../../../hooks';
import * as styles from './styles';

export const HeaderMeetingShareModalSelectOption = ({
  innerProps,
  isDisabled,
  data,
  isSelected,
  setValue,
  setGroup,
  handleGroupModalOpen,
}) => {
  const { mutateAsync } = useRemoveGroupMutation(data.value);

  if (data.component) {
    return <Box>{data.component}</Box>;
  }

  const handleClickRemove = async (event) => {
    event.stopPropagation();
    await mutateAsync();

    if (isSelected) {
      setValue(null);
    }
  };

  const handleClickEdit = (event) => {
    event.stopPropagation();

    setGroup(data.group);
    handleGroupModalOpen();
  };

  return !isDisabled ? (
    <Flex justify={'space-between'} css={styles.option} {...innerProps}>
      <Text fontSize={'18px'} fontWeight={'bold'} color={'#111'}>
        {data.label}
      </Text>
      <Flex>
        {isSelected && (
          <Box>
            <BiCheck size={'24px'} />
          </Box>
        )}
        <Box
          onClick={handleClickEdit}
          ml={'16px'}
          as={'button'}
          opacity={'.32'}
        >
          <AiOutlineEdit size={'24px'} />
        </Box>
        <Box
          onClick={handleClickRemove}
          ml={'18px'}
          as={'button'}
          opacity={'.32'}
        >
          <BiTrash size={'24px'} />
        </Box>
      </Flex>
    </Flex>
  ) : null;
};

HeaderMeetingShareModalSelectOption.propTypes = {
  innerProps: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
  setGroup: PropTypes.func.isRequired,
  handleGroupModalOpen: PropTypes.func.isRequired,
};
