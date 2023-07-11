import { useForm } from 'react-final-form';

import { NewProjectFormValues } from '../../NewProjectForm/NewProjectFormTypes';
import { PlanStepFields } from 'domains/projects/store';

export const useSelectedPlanName = () => {
  const form = useForm<NewProjectFormValues>();

  const {
    values: { [PlanStepFields.planName]: name },
  } = form.getState();

  return name;
};
