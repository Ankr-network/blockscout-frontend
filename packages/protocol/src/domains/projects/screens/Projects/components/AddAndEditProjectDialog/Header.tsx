import { t } from '@ankr.com/common';
import { OctagonWarning, Success } from '@ankr.com/ui';

import { AddProjectState } from 'domains/projects/hooks/useAddAndEditProject';

import { useAddProjectDialogStyles } from './useAddProjectDialogStyles';
import { useProjectFormValues } from '../../hooks/useProjectFormValues';

interface HeaderProps {
  addProjectState: AddProjectState;
}

export const Header = ({ addProjectState }: HeaderProps) => {
  const { classes, cx } = useAddProjectDialogStyles();

  const { isEditingProjectDialog } = useProjectFormValues();

  if (isEditingProjectDialog) {
    return <>{t('projects.edit-project.dialog.title')}</>;
  }

  if (addProjectState === AddProjectState.success) {
    return (
      <>
        <Success className={cx(classes.titleIcon, classes.checkIcon)} />
        {t('projects.new-project.success-dialog.title')}
      </>
    );
  }

  if (addProjectState === AddProjectState.failed) {
    return (
      <>
        <OctagonWarning className={cx(classes.titleIcon, classes.failedIcon)} />
        {t('projects.new-project.failed-dialog.title')}
      </>
    );
  }

  return <>{t('projects.new-project.dialog.title')}</>;
};
