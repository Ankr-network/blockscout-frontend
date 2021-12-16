import { SliderField } from './SliderField';
import { Field, Form, FormRenderProps } from 'react-final-form';

const SliderFieldStory = () => {
  const renderForm = ({ handleSubmit }: FormRenderProps<any>) => {
    return (
      <form onSubmit={handleSubmit}>
        <Field component={SliderField} name="foobar" />
      </form>
    );
  };

  return (
    <div>
      <Form onSubmit={() => alert('Submit')} render={renderForm} />
    </div>
  );
};

export const SliderFieldExample = () => <SliderFieldStory />;

export default {
  title: 'UiKit/SliderField',
};
