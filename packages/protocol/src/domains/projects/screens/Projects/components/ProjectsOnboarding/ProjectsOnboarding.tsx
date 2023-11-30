import { t } from '@ankr.com/common';
import { Button } from '@mui/material';

import { useDialog } from 'modules/common/hooks/useDialog';

import { useProjectHeaderStyles } from '../ProjectHeader/useProjectHeaderStyles';
import { ProjectsOnboardingDialog } from './ProjectsOnboardingDialog';

export const ProjectsOnboarding = () => {
  const { classes, cx } = useProjectHeaderStyles();

  const { isOpened, onClose, onOpen } = useDialog();

  return (
    <>
      <Button
        className={cx(classes.link, classes.linkOnBoarding)}
        onClick={onOpen}
        variant="text"
      >
        {t('projects.list-project.learn-more')}
      </Button>

      <ProjectsOnboardingDialog isOpened={isOpened} onClose={onClose} />
    </>
  );
};
