import { useForm } from 'react-final-form';

import { useProjectChains } from '../../hooks/useProjectChains';
import { NewProjectFormValues } from '../NewProjectForm/NewProjectFormTypes';

export const useWhitelist = () => {
  const { projectChains, isLoading } = useProjectChains();

  const form = useForm<NewProjectFormValues>();

  const {
    values: { chainName },
  } = form.getState();

  const chain = projectChains.find(i => i.name === chainName);

  return {
    chain,
    isLoading,
  };
};
