/* eslint-disable no-console */
import { Field, Form, FormRenderProps } from 'react-final-form';

import { SliderField } from './SliderField';

const SliderFieldStory = (): JSX.Element => {
  const renderForm = ({
    handleSubmit,
  }: FormRenderProps<unknown>): JSX.Element => {
    return (
      <form onSubmit={handleSubmit}>
        <Field component={SliderField} name="foobar" />
      </form>
    );
  };

  return (
    <div>
      <Form render={renderForm} onSubmit={() => console.log('Submit')} />
    </div>
  );
};

export const SliderFieldExample = (): JSX.Element => <SliderFieldStory />;

export default {
  title: 'UiKit/SliderField',
};
