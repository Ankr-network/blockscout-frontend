import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'modules/themes/mainTheme';

import { AngleDownIcon } from './AngleDownIcon';
import { AngleRightIcon } from './AngleRightIcon';
import { ArrowRightIcon } from './ArrowRightIcon';
import { BoxIcon } from './BoxIcon';
import { ChatIcon } from './ChatIcon';
import { DiamondIcon } from './DiamondIcon';
import { CopyIcon } from './CopyIcon';
import { FileIcon } from './FileIcon';
import { PaperIcon } from './PaperIcon';
import { SuccessIcon } from './SuccessIcon';

storiesOf('uiKit/Icons', module).add('Default', () => (
  <Box margin="8" display="flex" justifyContent="space-around" flexWrap="wrap">
    <ThemeProvider theme={mainTheme}>
      <AngleDownIcon />
      <AngleRightIcon />
      <ArrowRightIcon />
      <ChatIcon />
      <BoxIcon />
      <DiamondIcon />
      <CopyIcon />
      <FileIcon />
      <PaperIcon />
      <SuccessIcon />
    </ThemeProvider>
  </Box>
));
