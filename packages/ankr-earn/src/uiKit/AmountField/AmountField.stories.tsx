import { Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { AmountField } from './AmountField';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},

  input: {
    margin: 10,
  },

  form: {
    padding: 10,
  },
}));

const AmountFieldStory = () => {
  const classes = useStyles();

  const renderForm = ({ handleSubmit }: FormRenderProps<any>) => {
    return (
      <Paper className={classes.form} component="form" onSubmit={handleSubmit}>
        <Field
          id={1}
          className={classes.input}
          component={AmountField}
          name="amount"
          placeholder="Amount"
          color="primary"
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

export const InputFieldExample = () => <AmountFieldStory />;

export default {
  title: 'UiKit/AmountFieldStory',
};
