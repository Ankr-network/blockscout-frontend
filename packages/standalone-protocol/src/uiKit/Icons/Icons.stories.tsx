import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'modules/themes/mainTheme';

import { AngleDownIcon } from './AngleDownIcon';
import { AngleRightIcon } from './AngleRightIcon';
import { ArrowRightIcon } from './ArrowRightIcon';
import { CopyIcon } from './CopyIcon';
import { ReactComponent as SuccessIcon } from './success.svg';

storiesOf('uiKit/Icons', module).add('Default', () => (
  <Box margin="8" display="flex" justifyContent="space-around" flexWrap="wrap">
    <ThemeProvider theme={mainTheme}>
      <AngleDownIcon />
      <AngleRightIcon />
      <ArrowRightIcon />
      <CopyIcon />
      <SuccessIcon />
    </ThemeProvider>
  </Box>
));
