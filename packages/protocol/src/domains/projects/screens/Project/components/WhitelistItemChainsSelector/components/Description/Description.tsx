import { t } from '@ankr.com/common';

import { ProjectError } from 'domains/projects/components/ProjectError';
import { ProjectSidebarDescription } from 'domains/projects/screens/Project/components/ProjectSidebarDescription';

import { useDescriptionStyles } from './useDescriptionStyles';

export interface DescriptionProps {
  description: string;
  isValid: boolean;
}

export const Description = ({ description, isValid }: DescriptionProps) => {
  const { classes } = useDescriptionStyles();

  return (
    <div className={classes.root}>
      <ProjectSidebarDescription>{description}</ProjectSidebarDescription>
      {!isValid && (
        <ProjectError>{t('project.add-chains-form.error')}</ProjectError>
      )}
    </div>
  );
};
