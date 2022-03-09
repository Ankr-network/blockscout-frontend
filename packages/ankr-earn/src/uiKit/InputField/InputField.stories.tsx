/* eslint-disable no-console */
import { Paper, makeStyles } from '@material-ui/core';
import { Field, Form, FormRenderProps } from 'react-final-form';

import { InputField } from './InputField';

const useStyles = makeStyles(() => ({
  block: {},

  input: {
    margin: 10,
  },

  form: {
    padding: 10,
  },
}));

const InputFieldStory = (): JSX.Element => {
  const classes = useStyles();

  const renderForm = ({ handleSubmit }: FormRenderProps<unknown>) => {
    return (
      <Paper className={classes.form} component="form" onSubmit={handleSubmit}>
        <Field
          className={classes.input}
          color="primary"
          component={InputField}
          id={1}
          name="email"
          placeholder="Your email address"
          type="email"
        />

        <Field
          className={classes.input}
          color="secondary"
          component={InputField}
          id={1}
          name="email2"
          placeholder="Your email address"
          type="email"
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

export const InputFieldExample = (): JSX.Element => <InputFieldStory />;

export default {
  title: 'UiKit/InputField',
};
