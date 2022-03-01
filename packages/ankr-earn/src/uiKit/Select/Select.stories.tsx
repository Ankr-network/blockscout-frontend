/* eslint-disable import/no-extraneous-dependencies */
import { Paper } from '@material-ui/core';
import { Story } from '@storybook/react';
import { ChangeEvent, CSSProperties, useCallback, useState } from 'react';

import { ISelectProps, Select } from './Select';

export default {
  title: 'uiKit/Select',
  component: Select,
};

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

const Template: Story<ISelectProps> = ({ variant, ...rest }: ISelectProps) => {
  const [value, setValue] = useState<string>(items[0].value);

  const onChange = useCallback((event: ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
  }, []);

  const paperStyles: CSSProperties = {
    padding: 20,
    background: variant === 'outlined' ? 'none' : '',
  };

  return (
    <Paper style={paperStyles}>
      <Select
        {...rest}
        options={items}
        value={value}
        variant={variant}
        onChange={onChange}
      />
    </Paper>
  );
};

export const Default = Template.bind({});

Default.args = {
  variant: 'outlined',
  fullWidth: false,
  disabled: false,
};
