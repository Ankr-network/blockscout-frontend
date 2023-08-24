import { useForm } from 'react-final-form';

export const initialValues = {
  name: '',
  description: '',
  isEditingProjectDialog: false,
  tokenIndex: 0,
};

export const useProjectFormValues = () => {
  const { getState, change } = useForm();

  const {
    values: {
      name = initialValues.name,
      description = initialValues.description,
      isEditingProjectDialog = initialValues.isEditingProjectDialog,
      tokenIndex = initialValues.tokenIndex,
    },
    valid,
  } = getState();

  return {
    name,
    description,
    isEditingProjectDialog,
    tokenIndex,
    valid,
    onChange: change,
  };
};
