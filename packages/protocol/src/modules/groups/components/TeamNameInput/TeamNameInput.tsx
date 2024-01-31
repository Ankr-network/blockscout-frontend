import { TextField } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { ChangeEvent } from 'react';

import { useTeamNameInputStyles } from './useTeamNameInputStyles';

interface TeamNameInputProps {
  teamNameValue: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TeamNameInput = ({
  teamNameValue,
  handleChange,
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
    />
  );
};
