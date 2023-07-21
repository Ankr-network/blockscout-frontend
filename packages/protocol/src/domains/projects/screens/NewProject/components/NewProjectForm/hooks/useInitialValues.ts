import { useMemo } from 'react';

import { NewProjectStep } from 'domains/projects/types';
import { NewProjectType } from 'domains/projects/store';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';

import { NewProjectFormValues } from '../NewProjectFormTypes';

export const getInitialValues = (project?: NewProjectType) => {
  const initialValues: NewProjectFormValues = {};

  if (!project) {
    return initialValues;
  }

  Object.values(NewProjectStep).forEach(step => {
    const stepValues = project[step as NewProjectStep];

    if (stepValues) {
      Object.entries(stepValues).forEach(([key, value]) => {
        initialValues[key as keyof NewProjectFormValues] = value;
      });
    }
  });

  return initialValues;
};

export const useInitialValues = () => {
  const { project } = useProjectConfig();

  return useMemo(() => getInitialValues(project), [project]);
};
