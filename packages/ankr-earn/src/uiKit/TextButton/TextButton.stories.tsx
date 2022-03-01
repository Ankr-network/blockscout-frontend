/* eslint-disable import/no-extraneous-dependencies */
import { makeStyles } from '@material-ui/core';
import { Story } from '@storybook/react';

import { IButtonProps } from 'uiKit/Button';

import { TextButton } from './TextButton';

export default {
  title: 'UiKit/TextButton',
  component: TextButton,
};

const Template: Story<IButtonProps> = args => <TextButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Click me!',
};

const useStyles = makeStyles(theme => ({
  block: {
    '& hr': {
      display: 'block',
      margin: '16px 0',
      borderColor: theme.palette.text.secondary,
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 16,
  },

  button: {
    marginRight: 16,
  },
}));

const ButtonsListStory = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      Size
      <div className={classes.content}>
        <TextButton className={classes.button}>Default</TextButton>
      </div>
    </div>
  );
};

export const List = (): JSX.Element => <ButtonsListStory />;
