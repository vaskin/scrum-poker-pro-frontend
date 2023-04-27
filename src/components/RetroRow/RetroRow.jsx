import { Box, Button, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { BiPlus, HiCheck, MdClose } from 'react-icons/all';

import { EVENT_TYPES } from '../../constants';
import { useCreateStickerMutation } from '../../hooks';
import { createEditSticker } from '../../services/validation';
import { Textarea } from '../Textarea/Textarea';

export const RetroRow = ({ id, name, children, sendJsonMessage }) => {
  const [isEditorOpen, setIsEditorOpen] = useState();
  const isMobile = useBreakpointValue({ sm: true, md: false });

  const { mutateAsync: createSticker, isLoading: isStickerLoading } =
    useCreateStickerMutation();

  const handleEdit = () => {
    setIsEditorOpen(true);
  };

  const handleEditClose = () => {
    setIsEditorOpen(false);
  };

  const handleSubmit = async ({ text }) => {
    await createSticker({
      retroColumnId: id,
      text,
    });

    handleEditClose();
    sendJsonMessage({ eventType: EVENT_TYPES.SELECT });
  };

  return (
    <Flex
      direction={'column'}
      maxHeight={'100%'}
      overflow={'hidden'}
      flexShrink={0}
      mx={'15px'}
      width={{
        xl: '423px',
        lg: '370px',
        md: '310px',
        sm: '310px',
      }}
    >
      <Box
        overflow={'hidden'}
        borderTopLeftRadius={'16px'}
        borderTopRightRadius={'16px'}
        border={'2px solid #BFBFBF'}
      >
        <Text
          color={'#000'}
          fontSize={{
            sm: '20px',
            md: '20px',
            lg: '23px',
            xl: '23px',
          }}
          fontWeight={'900'}
          whiteSpace={'nowrap'}
          p={'24px'}
        >
          {name}
        </Text>
      </Box>
      <Box
        borderBottomRightRadius={'16px'}
        border={'2px solid #BFBFBF'}
        borderTop={'none'}
        borderBottomLeftRadius={'16px'}
        p={'24px'}
        pt={'0'}
      >
        {isEditorOpen ? (
          <Formik
            initialValues={{
              text: '',
            }}
            validationSchema={createEditSticker}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <Box mb={'10px'} pt={'5px'} position={'relative'}>
                <Textarea
                  showError={false}
                  height={'120px'}
                  autofocus
                  onKeyDown={(event) => {
                    if (event.code === 'Enter') {
                      handleSubmit();
                    }
                  }}
                  name={'text'}
                  placeholder={'Card text:'}
                />
                <Flex
                  mt={'5px'}
                  zIndex={10}
                  justifyContent={'flex-end'}
                  direction={'row'}
                >
                  <Button
                    isDisabled={isStickerLoading}
                    onClick={handleEditClose}
                    variant={'ghost'}
                  >
                    <MdClose size={24} />
                  </Button>
                  <Button
                    isLoading={isStickerLoading}
                    onClick={handleSubmit}
                    variant={'ghost'}
                  >
                    <HiCheck size={24} />
                  </Button>
                </Flex>
              </Box>
            )}
          </Formik>
        ) : (
          <Flex
            _hover={{
              opacity: '0.5',
            }}
            onClick={handleEdit}
            width={'100%'}
            p={'20px'}
            alignItems={'center'}
            as={'button'}
          >
            <BiPlus size={24} color={'rgba(17, 17, 17, 0.32)'} />
            <Text
              fontSize={{
                sm: '16px',
                md: '16px',
                lg: '18px',
                xl: '18px',
              }}
              fontWeight={'bold'}
              color={'rgba(17, 17, 17, 0.32)'}
              ml={'16px'}
              as={'button'}
            >
              Add card
            </Text>
          </Flex>
        )}
        <Box
          height={`calc(100vh - 320px - ${
            isEditorOpen ? (isMobile ? 116 : 113) : 0
          }px)`}
          mx={'-25px'}
          overflowY={'auto'}
          overflowX={'hidden'}
        >
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

RetroRow.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  sendJsonMessage: PropTypes.func.isRequired,
};
