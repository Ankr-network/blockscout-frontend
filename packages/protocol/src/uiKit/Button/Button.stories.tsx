import React from 'react';
import { Box, ThemeProvider, Button } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'ui';
import { CopyIcon } from '../Icons/CopyIcon';

storiesOf('uiKit/Button', module)
  .add('Сontained Buttons', () => (
    <Box margin="8" display="flex" justifyContent="space-around">
      <ThemeProvider theme={mainTheme}>
        <Button variant="contained">Default</Button>
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
        <Button variant="contained" color="primary" href="#contained-buttons">
          Link
        </Button>
      </ThemeProvider>
    </Box>
  ))
  .add('White Button', () => (
    <Box margin="8" display="flex" justifyContent="space-around">
      <ThemeProvider theme={mainTheme}>
        <Button variant="text" color="primary">
          White button (variant = text color = primary)
        </Button>
      </ThemeProvider>
    </Box>
  ))
  .add('Text Buttons', () => (
    <Box margin="8" display="flex" justifyContent="space-around">
      <ThemeProvider theme={mainTheme}>
        <Button variant="text">Default</Button>
        <Button variant="text" color="primary">
          Text Primary is a White button
        </Button>
        <Button variant="text" color="secondary">
          Secondary
        </Button>
        <Button variant="text" disabled>
          Disabled
        </Button>
        <Button variant="text" href="#text-buttons">
          Link
        </Button>
      </ThemeProvider>
    </Box>
  ))
  .add('Outlined Buttons', () => (
    <Box margin="8" display="flex" justifyContent="space-around">
      <ThemeProvider theme={mainTheme}>
        <Button variant="outlined">Default</Button>
        <Button variant="outlined" color="primary">
          Primary
        </Button>
        <Button variant="outlined" color="secondary">
          Secondary
        </Button>
        <Button variant="outlined" disabled>
          Disabled
        </Button>
        <Button variant="outlined" color="primary" href="#outlined-buttons">
          Link
        </Button>
      </ThemeProvider>
    </Box>
  ))
  .add('Sizes', () => (
    <Box margin="8">
      <ThemeProvider theme={mainTheme}>
        <Box mb="16px">
          <Box fontSize="16px" mb="10px" fontWeight="500">
            Text
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button size="small" variant="text">
              Small
            </Button>
            <Button size="medium" variant="text">
              Medium
            </Button>
            <Button size="large" variant="text">
              Large
            </Button>
          </Box>
        </Box>
        <Box mb="16px">
          <Box fontSize="16px" mb="10px" fontWeight="500">
            Outlined
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" size="small" color="primary">
              Small
            </Button>
            <Button variant="outlined" size="medium" color="primary">
              Medium
            </Button>
            <Button variant="outlined" size="large" color="primary">
              Large
            </Button>
          </Box>
        </Box>
        <Box mb="16px">
          <Box fontSize="16px" mb="10px" fontWeight="500">
            Contained
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" size="small" color="primary">
              Small
            </Button>
            <Button variant="contained" size="medium" color="primary">
              Medium
            </Button>
            <Button variant="contained" size="large" color="primary">
              Large
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  ))
  .add('Buttons with icon', () => (
    <Box margin="8" display="flex" justifyContent="space-around">
      <ThemeProvider theme={mainTheme}>
        <Button variant="contained" startIcon={<CopyIcon />}>
          Active
        </Button>
        <Button variant="contained" disabled startIcon={<CopyIcon />}>
          Disabled
        </Button>
      </ThemeProvider>
    </Box>
  ));
