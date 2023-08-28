import { t } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';

import { AddAndEditProjectForm } from '../AddAndEditProjectForm';
import { useAddAndEditProjectContentStyles } from './useAddAndEditProjectContentStyles';
import { useProjectFormValues } from '../../hooks/useProjectFormValues';

interface AddAndEditProjectContentProps {
  isLoading: boolean;
  handleFormSubmit: () => void;
  onClose: () => void;
}

export const AddAndEditProjectContent = ({
  isLoading,
  handleFormSubmit,
  onClose,
}: AddAndEditProjectContentProps) => {
  const { classes } = useAddAndEditProjectContentStyles();

  const { isEditingProjectDialog } = useProjectFormValues();

  return (
    <>
      {!isEditingProjectDialog && (
        <Typography
          variant="body2"
          component="p"
          className={classes.description}
        >
          {t('projects.new-project.dialog.description')}
        </Typography>
      )}

      <AddAndEditProjectForm
        isLoading={isLoading}
        handleSubmit={handleFormSubmit}
      />

      <Button fullWidth size="large" variant="outlined" onClick={onClose}>
        {t('projects.new-project.dialog.cancel')}
      </Button>
    </>
  );
};
