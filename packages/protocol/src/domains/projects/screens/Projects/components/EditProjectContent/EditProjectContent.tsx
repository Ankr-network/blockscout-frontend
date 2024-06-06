import { t } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';

import { EditProjectForm } from '../EditProjectForm';
import { useEditProjectContentStyles } from './useEditProjectContentStyles';

interface EditProjectContentProps {
  isLoading: boolean;
  handleFormSubmit: () => void;
  onClose: () => void;
}

export const EditProjectContent = ({
  handleFormSubmit,
  isLoading,
  onClose,
}: EditProjectContentProps) => {
  const { classes } = useEditProjectContentStyles();

  return (
    <>
      <Typography variant="body2" component="p" className={classes.description}>
        {t('projects.rename-dialog.description')}
      </Typography>

      <EditProjectForm isLoading={isLoading} handleSubmit={handleFormSubmit} />

      <Button fullWidth size="large" variant="outlined" onClick={onClose}>
        {t('projects.rename-dialog.cancel')}
      </Button>
    </>
  );
};
