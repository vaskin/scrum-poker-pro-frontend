import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/all';

import {
  useRemoveAvatarMutation,
  useUpdateProfileMutation,
} from '../../../hooks';
import { editProfileSchema } from '../../../services/validation';
import { Input } from '../../Input/Input';
import { Modal } from '../../Modal/Modal';
import * as styles from '../styles';

export const HeaderHomeProfileModal = ({ isOpen, onClose, profile }) => {
  const { isLoading, mutateAsync } = useUpdateProfileMutation();
  const { mutateAsync: removeAvatar } = useRemoveAvatarMutation();
  const [previewAvatar, setPreviewAvatar] = useState(null);

  const handleFormSubmit = async (values) => {
    await mutateAsync(values);

    onClose();
  };

  const handleChangeAvatar = (file) => {
    const fr = new FileReader();

    fr.onload = () => {
      setPreviewAvatar(fr.result);
    };

    fr.readAsDataURL(file);
  };

  const handleRemoveAvatar = async (setFieldValue) => {
    await removeAvatar();
    setPreviewAvatar(null);
    setFieldValue('avatar', null);
  };

  return (
    <Modal maxWidth={'450px'} isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={{
          name: profile?.name,
          avatar: null,
        }}
        onSubmit={handleFormSubmit}
        validationSchema={editProfileSchema}
      >
        {({ setFieldValue, handleSubmit }) => (
          <Flex css={styles.editProfile}>
            <Text
              mb={{
                sm: '48px',
                md: '60px',
              }}
              fontSize={{
                sm: '28px',
                md: '32px',
              }}
              fontWeight={'900'}
            >
              Edit profile
            </Text>
            <Box display={'none'}>
              <input
                onChange={(event) => {
                  setFieldValue('avatar', event.target.files[0]);
                  handleChangeAvatar(event.target.files[0]);
                }}
                accept='image/png, image/jpeg'
                id={'file'}
                type='file'
                name={'image'}
              />
            </Box>
            <Box position={'relative'} as={'label'} htmlFor='file' mb={'15px'}>
              <Avatar
                size={'2xl'}
                name=''
                src={
                  previewAvatar ||
                  `data:${profile?.contentType};base64,${profile?.avatar}`
                }
              />
              <Flex css={styles.editPen}>
                <AiOutlineEdit size={'24px'} color={'#fff'} />
              </Flex>
            </Box>
            <Button
              onClick={() => handleRemoveAvatar(setFieldValue)}
              fontWeight={'400'}
              mb={'48px'}
              variant={'link'}
            >
              Delete photo
            </Button>
            <Input
              width={'100%'}
              mb={'32px'}
              placeholder={'Your name'}
              name={'name'}
            />
            <Button
              height={'60px'}
              isLoading={isLoading}
              onClick={handleSubmit}
              isFullWidth
            >
              Save
            </Button>
          </Flex>
        )}
      </Formik>
    </Modal>
  );
};

HeaderHomeProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
