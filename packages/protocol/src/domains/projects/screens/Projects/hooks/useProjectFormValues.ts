import { useForm } from 'react-final-form';

export const initialValues = {
  name: '',
  tokenIndex: 0,
};

export const useProjectFormValues = () => {
  const { getState, change } = useForm();

  const {
    values: {
      name = initialValues.name,
      tokenIndex = initialValues.tokenIndex,
    },
    valid,
  } = getState();

  return {
    name,
    tokenIndex,
    valid,
    onChange: change,
  };
};
