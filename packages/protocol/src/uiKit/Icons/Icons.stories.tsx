import { Box, ThemeProvider } from '@mui/material';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'uiKit/Theme/mainTheme';

import { AngleDownIcon } from './AngleDownIcon';
import { AngleRightIcon } from './AngleRightIcon';
import { ArrowRightIcon } from './ArrowRightIcon';
import { ReactComponent as BoxIcon } from './box.svg';
import { CopyIcon } from './CopyIcon';
import { ReactComponent as DiamondIcon } from './diamond.svg';
import { ReactComponent as FileIcon } from './file.svg';
import { ReactComponent as PaperIcon } from './paper.svg';
import { ReactComponent as SuccessIcon } from './success.svg';

storiesOf('uiKit/Icons', module).add('Default', () => (
  <Box margin="8" display="flex" justifyContent="space-around" flexWrap="wrap">
    <ThemeProvider theme={mainTheme}>
      <AngleDownIcon />
      <AngleRightIcon />
      <ArrowRightIcon />
      <BoxIcon />
      <DiamondIcon />
      <CopyIcon />
      <FileIcon />
      <PaperIcon />
      <SuccessIcon />
    </ThemeProvider>
  </Box>
));
