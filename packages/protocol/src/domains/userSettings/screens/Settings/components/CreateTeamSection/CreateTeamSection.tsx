import { Button, Paper, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import {
  UseTeamNameInputParams,
  useTeamNameInput,
} from 'modules/groups/components/TeamNameInput/hooks/useTeamNameInput';
import { TeamNameInput } from 'modules/groups/components/TeamNameInput';

import { useCreateTeamSectionStyles } from './useCreateTeamSectionStyles';

interface CreateTeamSectionProps extends UseTeamNameInputParams {}

export const CreateTeamSection = ({ teamName }: CreateTeamSectionProps) => {
  const { classes } = useCreateTeamSectionStyles();

  const { teamNameValue, handleChange } = useTeamNameInput({ teamName });

  return (
    <Paper className={classes.createTeamPaper}>
      <div className={classes.createTeamInner}>
        <Typography variant="h6">{t('teams.create-team.title')}</Typography>

        <Typography variant="body2" color="textSecondary">
          {t('teams.create-team.description')}
        </Typography>

        <div className={classes.teamNameInputWrapper}>
          <TeamNameInput
            teamNameValue={teamNameValue}
            handleChange={handleChange}
          />
          <Button size="large">
            {t('teams.create-team-form.create-team-button')}
          </Button>
        </div>
      </div>
    </Paper>
  );
};
