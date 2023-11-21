import { Form } from 'react-final-form';

import { useProjectsForm } from './useProjectsForm';

export const Projects = () => {
  const { handleFormSubmit, renderForm } = useProjectsForm();

  return <Form onSubmit={handleFormSubmit} render={renderForm} />;
};
