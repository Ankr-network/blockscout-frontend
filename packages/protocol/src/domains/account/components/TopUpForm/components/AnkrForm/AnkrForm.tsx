import { Form } from 'react-final-form';

import { AnkrFormProps } from './types';
import { useAnkrForm } from './hooks/useAnkrForm';

export const AnkrForm = (props: AnkrFormProps) => {
  const { handleSubmit, initialValues, renderForm } = useAnkrForm(props);

  return (
    <Form
      onSubmit={handleSubmit}
      render={renderForm}
      initialValues={initialValues}
    />
  );
};
