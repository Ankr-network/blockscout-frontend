/* eslint-disable no-console */
import { Paper, makeStyles } from '@material-ui/core';
import { Field, Form, FormRenderProps } from 'react-final-form';

import { AmountField } from './AmountField';

const useStyles = makeStyles(() => ({
  block: {},

  input: {
    margin: 10,
  },

  form: {
    padding: 10,
  },
}));

const AmountFieldStory = (): JSX.Element => {
  const classes = useStyles();

  const renderForm = ({ handleSubmit }: FormRenderProps<unknown>) => {
    return (
      <Paper className={classes.form} component="form" onSubmit={handleSubmit}>
        <Field
          className={classes.input}
          color="primary"
          component={AmountField}
          id={1}
          name="amount"
          placeholder="Amount"
        />
      </Paper>
    );
  };

  return (
    <div className={classes.block}>
      <Form render={renderForm} onSubmit={() => console.log('Submit')} />
    </div>
  );
};

export const InputFieldExample = (): JSX.Element => <AmountFieldStory />;

export default {
  title: 'UiKit/AmountFieldStory',
};
