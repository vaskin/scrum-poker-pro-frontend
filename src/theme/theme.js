import { extendTheme } from '@chakra-ui/react';

import { breakpoints } from './breakpoints';
import colors from './colors';
import { Button, Checkbox, Text, Textarea } from './components';
import { IconButton } from './components/IconButton';
import fonts from './fonts';
import global from './global';
import sizes from './sizes';
import styles from './styles';

export const theme = extendTheme({
  ...sizes,
  ...colors,
  ...styles,
  ...fonts,
  styles: {
    ...global,
  },
  breakpoints,
  components: {
    Text,
    Checkbox,
    Button,
    IconButton,
    Textarea,
  },
});
