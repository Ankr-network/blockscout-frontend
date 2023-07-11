import { NewProjectFormValues } from '../NewProjectForm/NewProjectFormTypes';

export const getCheckoutValues = (values: NewProjectFormValues) => {
  const { projectName, chainName, chainType } = values || {};
  const { contractAddress } = values || {};
  const { planName, planPrice } = values || {};

  return {
    projectName,
    chainName,
    chainType,
    contractAddress,
    planName,
    planPrice,
  };
};
