import { Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { InputField } from './InputField';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},

  input: {
    margin: 10,
  },

  form: {
    padding: 10,
  },
}));

const InputFieldStory = () => {
  const classes = useStyles();

  const renderForm = ({ handleSubmit }: FormRenderProps<any>) => {
    return (
      <Paper className={classes.form} component="form" onSubmit={handleSubmit}>
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
      </Paper>
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
