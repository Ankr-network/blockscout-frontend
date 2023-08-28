import { t } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';
import { useForm } from 'react-final-form';
import { push } from 'connected-react-router';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';

import { useSuccessAddProjectContentStyles } from './useSuccessAddProjectContentStyles';
import { AddAndEditProjectDialogFields } from '../AddAndEditProjectForm/AddAndEditProjectFormUtils';
import { initialValues } from '../../hooks/useProjectFormValues';

interface SuccessAddProjectContentProps {
  onClose: () => void;
}

export const SuccessAddProjectContent = ({
  onClose,
}: SuccessAddProjectContentProps) => {
  const { classes } = useSuccessAddProjectContentStyles();
  const dispatch = useDispatch();

  const { getState, change } = useForm();
  const {
    values: { name },
  } = getState();

  const handleConfigure = useCallback(() => {
    dispatch(push(ProjectsRoutesConfig.newProject.generatePath()));
    change(AddAndEditProjectDialogFields.name, initialValues.name);
    change(
      AddAndEditProjectDialogFields.description,
      initialValues.description,
    );
  }, [change, dispatch]);

  return (
    <>
      <Typography variant="body2" component="p" className={classes.description}>
        {t('projects.new-project.success-dialog.description', {
          value: name,
        })}
      </Typography>

      <Button
        fullWidth
        size="large"
        variant="contained"
        className={classes.configureButton}
        onClick={handleConfigure}
      >
        {t('projects.new-project.success-dialog.configure-project')}
      </Button>

      <Button fullWidth size="large" variant="outlined" onClick={onClose}>
        {t('projects.new-project.success-dialog.skip')}
      </Button>
    </>
  );
};
