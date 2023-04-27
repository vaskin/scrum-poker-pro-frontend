import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FieldArray, Formik } from 'formik';
import React, { useEffect } from 'react';
import {
  AiOutlineEdit,
  HiCheck,
  HiMinus,
  HiPlus,
  MdClose,
} from 'react-icons/all';
import { useHistory } from 'react-router-dom';

import { ReactComponent as Dashboard } from '../../assets/retroMeeting/dashboard.svg';
import {
  HeaderCreateMeeting,
  Input,
  Popover,
  RequestHandler,
} from '../../components';
import { ROUTES } from '../../constants';
import {
  useCreateMeetingMutation,
  useSaveTemplatesMutation,
} from '../../hooks';
import { useGetTemplatesQuery } from '../../hooks/useQueries';
import { retroMeetingSchema } from '../../services/validation';

const COLORS_FOR_TEMPLATE = [
  '#6AED8E',
  '#DE4116',
  '#50A0FF',
  '#FDB62C',
  '#DE16D6',
  '#FD7E50',
];

const COLORS = {
  '#6AED8E': '#F0FDF4',
  '#DE4116': '#FCECE8',
  '#50A0FF': '#EDF5FF',
  '#FDB62C': '#FFFFF2',
  '#DE16D6': '#F4E5F9',
  '#FD7E50': '#FBEDE5',
};

const COLUMNS = [
  {
    name: 'What went well?',
    value: 'What went well?',
    color: COLORS_FOR_TEMPLATE[0],
    isEdit: false,
  },
  {
    name: 'What went wrong?',
    value: 'What went wrong?',
    color: COLORS_FOR_TEMPLATE[1],
    isEdit: false,
  },
  {
    name: 'What needs improvement?',
    value: 'What needs improvement?',
    color: COLORS_FOR_TEMPLATE[2],
    isEdit: false,
  },
  {
    name: 'Action items',
    value: 'Action items',
    color: COLORS_FOR_TEMPLATE[3],
    isEdit: false,
  },
];

export const RetroMeetingCreate = () => {
  const history = useHistory();
  const { onOpen, onClose } = useDisclosure();

  const { data, isLoading: isTempatesLoading } = useGetTemplatesQuery();

  const { mutate: saveTemplates, isLoading: isTemplatesSaving } =
    useSaveTemplatesMutation();
  const { mutate: createMeeting, isLoading: isCreateMeetingLoading } =
    useCreateMeetingMutation();

  useEffect(() => {
    document.title = 'ScrumPokerPro | Retro meeting';
  }, []);

  const onArrowRightClick = () => {
    history.push(ROUTES.pokerPlanning);
  };

  const handleFormSubmit = async (values) => {
    const columns = values.columns.map((column) => ({
      color: COLORS[column.color],
      name: column.name,
    }));

    createMeeting({ ...values, columns });
  };

  const handleSaveTemplates = (data) => {
    const columns = data.map((column) => ({
      color: column.color,
      name: column.name,
    }));

    saveTemplates({
      columns,
    });
  };

  return (
    <Container maxWidth={'container.lg'}>
      <HeaderCreateMeeting
        title={'Retro meeting'}
        onArrowLeftClick={onArrowRightClick}
      />
      <RequestHandler isLoading={isTempatesLoading}>
        <Flex
          alignItems={'center'}
          direction={'column'}
          mt={'24px'}
          pb={['30px', '30px', '191px']}
        >
          <Box maxWidth={'470px'} width={'100%'}>
            <Dashboard />
          </Box>
          <Box
            mt={['24px', '32px']}
            maxWidth={['100%', '470px']}
            width={'100%'}
          >
            <Formik
              initialValues={{
                name: '',
                type: 'RETRO',
                columns:
                  data?.data?.columns?.map((item) => ({
                    ...item,
                    value: item.name,
                  })) || COLUMNS,
              }}
              validationSchema={retroMeetingSchema}
              onSubmit={handleFormSubmit}
            >
              {({ values, setFieldValue, handleSubmit }) => (
                <>
                  <Input
                    name={'name'}
                    placeholder={'Meeting name'}
                    mb={'24px'}
                  />
                  <FieldArray
                    name='columns'
                    render={({ remove, push }) => {
                      const handleEditOpen = (index) => {
                        setFieldValue(`columns[${index}].isEdit`, true);
                      };

                      const handleEditClose = (column, index) => {
                        setFieldValue(`columns[${index}].isEdit`, false);
                        setFieldValue(`columns[${index}].value`, column.name);
                      };

                      const handleConfirm = (column, index) => {
                        setFieldValue(`columns[${index}].isEdit`, false);
                        setFieldValue(`columns[${index}].name`, column.value);
                      };

                      const handleRemove = () => {
                        remove(values.columns.length - 1);
                      };

                      const handleAdd = () => {
                        push(COLUMNS[values.columns.length]);
                      };

                      const handlePickColor = (index, color) => {
                        setFieldValue(`columns[${index}].color`, color);
                      };

                      return (
                        <>
                          <Flex
                            mb={'24px'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                          >
                            <Text fontWeight={'bold'} fontSize={'18px'}>
                              Columns
                            </Text>
                            <Flex>
                              <Button
                                isDisabled={values.columns.length === 1}
                                onClick={handleRemove}
                                variant={'ghost'}
                              >
                                <HiMinus size={22} />
                              </Button>
                              <Button
                                isDisabled={values.columns.length >= 4}
                                onClick={handleAdd}
                                ml={'5px'}
                                variant={'ghost'}
                              >
                                <HiPlus size={22} />
                              </Button>
                            </Flex>
                          </Flex>
                          {values.columns &&
                            values.columns.length > 0 &&
                            values.columns.map((column, index) => (
                              <Flex
                                mb={'8px'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                key={index}
                              >
                                <Flex flexGrow={1} alignItems={'center'}>
                                  {column.isEdit ? (
                                    <Flex
                                      flexGrow={1}
                                      justifyContent={'space-between'}
                                    >
                                      <Box flexGrow={1}>
                                        <Input
                                          isFullWidth
                                          name={`columns[${index}].value`}
                                          placeholder={'Column name'}
                                          mb={'10px'}
                                        />
                                      </Box>
                                      <Flex>
                                        <Button
                                          onClick={() =>
                                            handleEditClose(column, index)
                                          }
                                          variant={'outline'}
                                          ml={'8px'}
                                          width={'56px'}
                                          height={'56px'}
                                        >
                                          <MdClose />
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            handleConfirm(column, index)
                                          }
                                          ml={'8px'}
                                          width={'56px'}
                                          height={'56px'}
                                        >
                                          <HiCheck />
                                        </Button>
                                      </Flex>
                                    </Flex>
                                  ) : (
                                    <Text
                                      wordBreak={'break-all'}
                                      display={'flex'}
                                    >
                                      {column.name}
                                    </Text>
                                  )}

                                  {!column.isEdit && (
                                    <Box
                                      onClick={() => handleEditOpen(index)}
                                      ml={'14px'}
                                      cursor={'pointer'}
                                      opacity={0.25}
                                    >
                                      <AiOutlineEdit color={'#0F1322'} />
                                    </Box>
                                  )}
                                </Flex>
                                {!column.isEdit && (
                                  <Popover
                                    onOpen={onOpen}
                                    onClose={onClose}
                                    maxWidth={'284px'}
                                    placement={'top-end'}
                                    component={
                                      <Box
                                        ml={'10px'}
                                        w={'24px'}
                                        h={'24px'}
                                        borderRadius={'4px'}
                                        bg={column.color}
                                      />
                                    }
                                  >
                                    <Flex direction={'row'} py={'10px'}>
                                      {COLORS_FOR_TEMPLATE.map(
                                        (color, colorIndex) => (
                                          <Box
                                            onClick={() =>
                                              handlePickColor(index, color)
                                            }
                                            cursor={'pointer'}
                                            mx={'6px'}
                                            key={colorIndex}
                                            w={'32px'}
                                            h={'32px'}
                                            borderRadius={'4px'}
                                            bg={color}
                                          />
                                        ),
                                      )}
                                    </Flex>
                                  </Popover>
                                )}
                              </Flex>
                            ))}
                        </>
                      );
                    }}
                  />
                  <Flex
                    mt={'34px'}
                    flexDirection={{
                      sm: 'column',
                      md: 'row',
                    }}
                    mx={{
                      sm: '-16px',
                      md: '0',
                    }}
                    px={{
                      sm: '8px',
                      md: '0',
                    }}
                  >
                    <Button
                      isDisabled={isCreateMeetingLoading}
                      onClick={() => handleSaveTemplates(values.columns)}
                      flexGrow={0.4}
                      variant={'outline'}
                      isLoading={isTemplatesSaving}
                      height={'60px'}
                    >
                      Save template
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      isLoading={isCreateMeetingLoading}
                      isDisabled={isTemplatesSaving}
                      flexFlow={1}
                      height={'60px'}
                      ml={{
                        sm: 0,
                        md: '16px',
                      }}
                      mt={{
                        sm: '10px',
                        md: '0',
                      }}
                      flexGrow={1}
                    >
                      Start meeting
                    </Button>
                  </Flex>
                </>
              )}
            </Formik>
          </Box>
        </Flex>
      </RequestHandler>
    </Container>
  );
};
