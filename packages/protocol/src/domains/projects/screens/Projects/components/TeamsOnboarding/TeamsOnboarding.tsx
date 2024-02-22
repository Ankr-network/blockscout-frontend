import { t } from '@ankr.com/common';
import { Button } from '@mui/material';

import { useDialog } from 'modules/common/hooks/useDialog';
import { TeamsOnboardingDialog } from 'domains/userSettings/screens/Settings/components/TeamsOnboardingDialog';

import { useProjectHeaderStyles } from '../ProjectHeader/useProjectHeaderStyles';

export const TeamsOnboarding = () => {
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

      <TeamsOnboardingDialog isOpened={isOpened} onClose={onClose} />
    </>
  );
};
