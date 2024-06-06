import { useForm } from 'react-final-form';

export const initialValues = {
  name: '',
  tokenIndex: 0,
};

export const useProjectFormValues = () => {
  const { change, getState } = useForm();

  const {
    valid,
    values: {
      name = initialValues.name,
      tokenIndex = initialValues.tokenIndex,
    },
  } = getState();

  return {
    name,
    tokenIndex,
    valid,
    onChange: change,
  };
};
