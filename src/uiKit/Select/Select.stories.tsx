import React, { ChangeEvent, useCallback, useState } from 'react';
import { Box, makeStyles, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'modules/themes/mainTheme';
import { Select } from './Select';

const items = [
  {
    value: 'value 1',
    label: 'label 1',
  },
  {
    value: 'value 2',
    label: 'label 2',
  },
  {
    value: 'value 3',
    label: 'label 3',
  },
];

export const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'grey',
    padding: 20,
  },
}));

storiesOf('components/Select', module).add('Default', () => {
  const classes = useStyles();
  const [value, setValue] = useState<string>(items[0].value);

  const onChange = useCallback((event: ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as any);
  }, []);

  return (
    <Box margin="8" className={classes.root}>
      <ThemeProvider theme={mainTheme}>
        <Select value={value} onChange={onChange} options={items} fullWidth />
      </ThemeProvider>
    </Box>
  );
});
