/* eslint-disable import/no-extraneous-dependencies */
import { Checkbox, CheckboxProps } from '@material-ui/core';
import { Story } from '@storybook/react';

export default {
  title: 'UiKit/Checkbox',
  component: Checkbox,
};

const Template: Story<CheckboxProps> = args => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  checked: false,
  disabled: false,
  color: 'default',
  indeterminate: false,
  required: false,
  size: 'medium',
};
