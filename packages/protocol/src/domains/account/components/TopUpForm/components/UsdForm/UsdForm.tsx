import { Form } from 'react-final-form';

import { UsdFormProps } from './types';
import { useUsdForm } from './hooks/useUsdForm';

export const UsdForm = (props: UsdFormProps) => {
  const { initialValues, onSubmit, renderForm } = useUsdForm(props);

  return (
    <Form
      onSubmit={onSubmit}
      render={renderForm}
      initialValues={initialValues}
    />
  );
};
