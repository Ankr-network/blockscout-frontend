import React from 'react';
import { Box, Checkbox } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

storiesOf('uiKit/Checkbox', module).add('Default', () => (
  <Box margin="8" display="flex" justifyContent="space-around">
    <Checkbox />
    <Checkbox checked />
    <Checkbox disabled />
  </Box>
));
