import { Story } from '@storybook/react';
import React from 'react';
import { ISpinnerProps, Spinner } from './Spinner';

export default {
  title: 'UiKit/Spinner',
  component: Spinner,
};

const Template: Story<ISpinnerProps> = args => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  centered: false,
};
