import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React from 'react';

import { Checkbox } from '../../../../components';
import * as styles from './styles';

export const MeetingAsideImportJiraModalFilter = () => {
  const { setFieldValue, values } = useFormikContext();

  const handleClick = () => {
    setFieldValue('type', []);
  };

  return (
    <Box>
      <Flex css={styles.filterWrapper}>
        <Text>Filters</Text>
        <Button onClick={handleClick} fontWeight={'400'} variant={'link'}>
          Clear
        </Button>
      </Flex>
      <Accordion allowMultiple>
        <AccordionItem isDisabled border={'none'} mx={'-12px'} px={'12px'}>
          <AccordionButton width={'100%'} px={'0'}>
            <Text fontWeight={'bold'} opacity={'.8'} flex='1' textAlign='left'>
              Sprint
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel css={styles.accordionPanel}>some</AccordionPanel>
        </AccordionItem>
        <AccordionItem border={'none'} mx={'-12px'} px={'12px'}>
          <AccordionButton
            borderBottom={'1px solid rgba(184,184,184, .25)'}
            width={'100%'}
            px={'0'}
          >
            <Text fontWeight={'bold'} opacity={'.8'} flex='1' textAlign='left'>
              Project
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel css={styles.accordionPanel}>
            <Flex direction={'column'}>
              <Checkbox
                isChecked={values.type.includes('SPP')}
                variant={'gray'}
                mb={'8px'}
                name={'type'}
                value={'SPP'}
              >
                SPP
              </Checkbox>
              <Checkbox
                isChecked={values.type.includes('DEVOPS')}
                variant={'gray'}
                mb={'8px'}
                name={'type'}
                value={'DEVOPS'}
              >
                DEVOPS
              </Checkbox>
              <Checkbox
                isChecked={values.type.includes('POAR')}
                variant={'gray'}
                mb={'8px'}
                name={'type'}
                value={'POAR'}
              >
                POAR
              </Checkbox>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};
