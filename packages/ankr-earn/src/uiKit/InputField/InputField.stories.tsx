import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { InputField } from './InputField';
import { Field, Form, FormRenderProps } from 'react-final-form';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},

  input: {
    marginBottom: 16,
  },
}));

const InputFieldStory = () => {
  const classes = useStyles();

  const renderForm = ({ handleSubmit }: FormRenderProps<any>) => {
    return (
      <form onSubmit={handleSubmit}>
        <Field
          id={1}
          className={classes.input}
          component={InputField}
          name="email"
          type="email"
          placeholder="Your email address"
          color="primary"
        />
        <Field
          id={1}
          className={classes.input}
          component={InputField}
          name="email2"
          type="email"
          placeholder="Your email address"
          color="secondary"
        />
      </form>
    );
  };

  return (
    <div className={classes.block}>
      <Form onSubmit={() => alert('Submit')} render={renderForm} />
    </div>
  );
};

export const InputFieldExample = () => <InputFieldStory />;

export default {
  title: 'UiKit/InputField',
};
