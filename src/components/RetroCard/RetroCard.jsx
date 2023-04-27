import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import {
  AiFillLike,
  AiOutlineLike,
  HiCheck,
  HiOutlineDotsVertical,
  MdClose,
} from 'react-icons/all';
import ResizeTextarea from 'react-textarea-autosize';

import { breakpoints } from '../../api/breakpoints';
import { API_URL, EVENT_TYPES } from '../../constants';
import {
  useDeleteLikeStickerMutation,
  useRemoveStickerMutation,
  useSetLikeStickerMutation,
  useUpdateStickerMutation,
} from '../../hooks';
import UserService from '../../services/UserService';
import { createEditSticker } from '../../services/validation';
import { Popover } from '../Popover/Popover';
import { RequestHandler } from '../RequestHandler/RequestHandler';
import { Textarea } from '../Textarea/Textarea';
import * as styles from './styles';

export const RetroCard = memo(
  ({ id, color, data, sendJsonMessage, currentUser }) => {
    const { onClose, onOpen, isOpen } = useDisclosure();
    const [isEditing, setIsEditing] = useState();

    const { mutateAsync: updateSticker, isLoading: isUpdating } =
      useUpdateStickerMutation(id);
    const { mutateAsync: removeSticker, isLoading: isRemoving } =
      useRemoveStickerMutation(id);
    const { mutate: setLike, isLoading: setLikeLoading } =
      useSetLikeStickerMutation(id);
    const { mutate: deleteLike, isLoading: DeleteLikeLoading } =
      useDeleteLikeStickerMutation(id);

    const handleEdit = () => {
      setIsEditing(true);
      onClose();
    };

    const handleEditClose = () => {
      setIsEditing(false);
      onClose();
    };

    const handleSubmit = async ({ text }) => {
      await updateSticker({
        text,
      });

      handleEditClose();
      sendJsonMessage({ eventType: EVENT_TYPES.SELECT });
    };

    const handleRemoveSticker = async () => {
      await removeSticker();

      onClose();
      sendJsonMessage({ eventType: EVENT_TYPES.SELECT });
    };

    const handleSetLike = () => {
      if (data?.liked) {
        deleteLike();
      } else {
        setLike();
      }

      sendJsonMessage({ eventType: EVENT_TYPES.SELECT });
    };

    const owner = data.userId === currentUser;

    return (
      <Box
        mx={'25px'}
        mb={'8px'}
        p={'16px'}
        bg={isEditing ? '#FAFAFA' : color}
        borderRadius={'16px'}
        position={'relative'}
      >
        <RequestHandler spinnerSize={'md'} height={'120px'} isLoading={false}>
          {!isEditing && (
            <Flex
              mb={'18px'}
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Flex direction={'row'}>
                <Avatar
                  w={'24px'}
                  h={'24px'}
                  mr={'8px'}
                  name=''
                  src={
                    API_URL + breakpoints.getAvatar(id, UserService.getToken())
                  }
                />
                <Text color={'#0F1322'} fontSize={'18px'}>
                  {data?.userName}
                </Text>
              </Flex>
              {owner && (
                <Popover
                  onOpen={onOpen}
                  onClose={onClose}
                  maxWidth={'224px'}
                  component={
                    <Box>
                      <HiOutlineDotsVertical
                        color={isOpen ? '#FD7E50' : 'black'}
                        size={'24px'}
                      />
                    </Box>
                  }
                >
                  <RequestHandler
                    spinnerSize={'sm'}
                    height={'40px'}
                    isLoading={isRemoving}
                  >
                    <Text sx={styles.text} onClick={handleEdit} as={'button'}>
                      Edit
                    </Text>
                    <Text
                      onClick={handleRemoveSticker}
                      sx={styles.text}
                      as={'button'}
                    >
                      Delete
                    </Text>
                  </RequestHandler>
                </Popover>
              )}
            </Flex>
          )}

          {isEditing ? (
            <Formik
              initialValues={{
                text: data?.text || '',
              }}
              validationSchema={createEditSticker}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit }) => (
                <Box mb={'10px'} pt={'5px'} position={'relative'}>
                  <Textarea
                    showError={false}
                    minHeight={'120px'}
                    autofocus
                    as={ResizeTextarea}
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
                      isDisabled={isUpdating}
                      onClick={handleEditClose}
                      variant={'ghost'}
                    >
                      <MdClose size={24} />
                    </Button>
                    <Button
                      isLoading={isUpdating}
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
            <Text
              fontSize={{
                sm: '16px',
                lg: '18px',
              }}
              color={'#0F1322'}
              opacity={'.4'}
            >
              {data?.text}
            </Text>
          )}

          {!isEditing && (
            <Flex justifyContent={'flex-end'} align={'center'}>
              <Button
                variant={'unstyled'}
                isLoading={setLikeLoading || DeleteLikeLoading}
                cursor={'pointer'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                onClick={handleSetLike}
              >
                {data?.liked ? (
                  <AiFillLike size={20} color={'#FD7E50'} />
                ) : (
                  <AiOutlineLike size={20} />
                )}
              </Button>
              <Text fontSize={'18px'} color={'#0F1322'} ml={'3px'}>
                {data?.likes}
              </Text>
            </Flex>
          )}
        </RequestHandler>
      </Box>
    );
  },
);

RetroCard.displayName = 'RetroCard';
RetroCard.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  sendJsonMessage: PropTypes.func.isRequired,
  currentUser: PropTypes.string,
};
