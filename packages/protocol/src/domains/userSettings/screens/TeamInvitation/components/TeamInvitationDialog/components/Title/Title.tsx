import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { TeamAvatar } from 'domains/userSettings/components/TeamAvatar';

import { useTitleStyles } from './useTitleStyles';

export interface TitleProps {
  className?: string;
  teamName: string;
}

export const Title = ({ className, teamName }: TitleProps) => {
  const { classes, cx } = useTitleStyles();

  return (
    <div className={cx(classes.root, className)}>
      <TeamAvatar />
      <Typography className={classes.title} component="p" variant="h6">
        {t('teams.team-invitation-dialog.title', { teamName })}
      </Typography>
    </div>
  );
};
