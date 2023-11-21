import { Button } from '@mui/material';
import { Plus } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { CollapsingString } from 'modules/common/components/CollapsingString';

import { useProjectHeaderStyles } from '../ProjectHeader/useProjectHeaderStyles';

interface ProjectDescriptionProps {
  projectDescriptionText?: string;
  hasGroupAccess: boolean;
  onOpenProjectInfoDialog: () => void;
}

export const ProjectDescription = ({
  projectDescriptionText,
  hasGroupAccess,
  onOpenProjectInfoDialog,
}: ProjectDescriptionProps) => {
  const { classes } = useProjectHeaderStyles();

  if (projectDescriptionText) {
    return <CollapsingString text={projectDescriptionText} />;
  }

  if (!hasGroupAccess) {
    return null;
  }

  return (
    <Button
      className={classes.editInfoBtn}
      startIcon={<Plus />}
      variant="text"
      color="secondary"
      onClick={onOpenProjectInfoDialog}
    >
      {t('project.header.edit-info-btn')}
    </Button>
  );
};
