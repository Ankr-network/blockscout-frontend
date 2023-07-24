import { useForm } from 'react-final-form';

import { PlanStepFields } from 'domains/projects/store';

import { NewProjectFormValues } from '../../NewProjectForm/NewProjectFormTypes';

export const useSelectedPlanName = () => {
  const form = useForm<NewProjectFormValues>();

  const {
    values: { [PlanStepFields.planName]: name },
  } = form.getState();

  return name;
};
