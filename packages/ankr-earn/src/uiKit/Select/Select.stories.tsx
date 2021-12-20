import { Paper } from '@material-ui/core';
import { Story } from '@storybook/react';
import React, {
  ChangeEvent,
  CSSProperties,
  useCallback,
  useState,
} from 'react';
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

const Template: Story<ISelectProps> = args => {
  const [value, setValue] = useState<string>(items[0].value);

  const onChange = useCallback((event: ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as any);
  }, []);

  const paperStyles: CSSProperties = {
    padding: 20,
    background: args.variant === 'outlined' ? 'none' : '',
  };

  return (
    <Paper style={paperStyles}>
      <Select {...args} value={value} onChange={onChange} options={items} />
    </Paper>
  );
};

export const Default = Template.bind({});
Default.args = {
  variant: 'outlined',
  fullWidth: false,
  disabled: false,
};
