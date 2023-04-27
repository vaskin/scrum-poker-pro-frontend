import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React, { memo, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/all';

import { Popover, RequestHandler } from '../../../components';
import { useGetFieldsQuery } from '../../../hooks/useQueries';

export const MeetingVotesList = memo(() => {
  const { setFieldValue, values } = useFormikContext();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const { data: fieldsData = null, isLoading: isFieldsLoading = false } =
    useGetFieldsQuery();

  const handleClick = (value) => {
    setFieldValue('field', value);
  };

  useEffect(() => {
    if (fieldsData?.data) {
      const value =
        fieldsData?.data?.find((value) => value.name === 'Story Points') ||
        fieldsData?.data[0];

      setFieldValue('field', value);
    }
  }, [fieldsData, setFieldValue]);

  return (
    <Box mb={'4px'}>
      <Popover
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        width={{
          sm: '230px',
          md: 'auto',
        }}
        component={
          <Flex justify={'space-between'} align={'center'} width={'100%'}>
            <Text
              fontSize={{
                md: '16px',
                lg: '18px',
              }}
              textAlign={'left'}
              width={'80%'}
              color={'rgba(17, 17, 17, 0.32)'}
              fontWeight={'bold'}
              textOverflow={'ellipsis'}
              overflow={'hidden'}
              whiteSpace={'nowrap'}
            >
              {values?.field?.name || 'Field name'}
            </Text>
            <IoIosArrowDown color={'rgba(17, 17, 17, 0.32)'} size={'24px'} />
          </Flex>
        }
      >
        <Box maxHeight={'200px'} overflow={'auto'}>
          <RequestHandler height={'100px'} isLoading={isFieldsLoading}>
            {fieldsData?.data?.map((item, index) => (
              <Flex
                onClick={() => {
                  handleClick(item);
                  onClose();
                }}
                cursor={'pointer'}
                width={'100%'}
                py={'8px'}
                key={index}
              >
                <Text
                  fontSize={{
                    md: '16px',
                    lg: '18px',
                  }}
                  fontWeight={'bold'}
                >
                  {item.name}
                </Text>
              </Flex>
            ))}
          </RequestHandler>
        </Box>
      </Popover>
    </Box>
  );
});

MeetingVotesList.displayName = 'MeetingVotesList';
