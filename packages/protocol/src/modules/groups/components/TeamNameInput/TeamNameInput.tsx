import { TextField } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { ChangeEvent } from 'react';

import { MAX_TEAM_NAME_LENGTH } from 'domains/userSettings/screens/Settings/constants';

import { useTeamNameInputStyles } from './useTeamNameInputStyles';

interface TeamNameInputProps {
  teamNameValue: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TeamNameInput = ({
  handleChange,
  teamNameValue,
}: TeamNameInputProps) => {
  const { classes } = useTeamNameInputStyles();

  return (
    <TextField
      label={t('teams.create-team-form.label')}
      className={classes.teamNameTextField}
      value={teamNameValue}
      onChange={handleChange}
      placeholder={t('teams.create-team-form.placeholder')}
      InputProps={{
        size: 'medium',
      }}
      maxLength={MAX_TEAM_NAME_LENGTH}
    />
  );
};
