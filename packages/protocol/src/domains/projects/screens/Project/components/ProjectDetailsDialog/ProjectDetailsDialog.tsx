import React from 'react';
import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';

import { useProjectDetailsDialogStyles } from './useProjectDetailsDialogStyles';
import {
  ProjectDetailsBaseProps,
  useProjectDetailsForm,
} from './hooks/useProjectDetailsForm';
import { ProjectDetailsForm } from './ProjectDetailsForm';

interface ProjectDetailsDialogProps extends ProjectDetailsBaseProps {
  isOpened: boolean;
  projectName?: string;
  projectDescription?: string;
}

export const ProjectDetailsDialog = ({
  isOpened = false,
  onClose,
  onSuccess,
  projectName,
  projectDescription,
  projectIndex,
}: ProjectDetailsDialogProps) => {
  const { classes } = useProjectDetailsDialogStyles();

  const { isUpdateLoading, handleFormSubmit } = useProjectDetailsForm({
    onSuccess,
    projectIndex,
    onClose,
  });

  return (
    <Dialog
      onClose={onClose}
      open={isOpened}
      title={t('project.header.edit-info-dialog-title')}
      titleClassName={classes.title}
    >
      <div className={classes.formWrapper}>
        <Typography color="textSecondary" variant="body2">
          {t('project.header.edit-info-dialog-description')}
        </Typography>

        <ProjectDetailsForm
          projectDescription={projectDescription}
          projectName={projectName}
          isUpdateLoading={isUpdateLoading}
          handleFormSubmit={handleFormSubmit}
          isDefaultProject={projectIndex === PRIMARY_TOKEN_INDEX}
          isDescriptionFocusedByDefault={!projectDescription}
        />

        <Button size="large" variant="outlined" onClick={onClose}>
          {t('project.header.edit-info-dialog-btn-cancel')}
        </Button>
      </div>
    </Dialog>
  );
};
