import { Paper, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { LoadingButton } from '@ankr.com/ui';
import React from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { TeamNameInput } from 'modules/groups/components/TeamNameInput';
import { DataTransferSection } from 'modules/groups/components/DataTransferSection';

import { useCreateTeamFormStyles } from './useCreateTeamFormStyles';

interface CreateTeamFormContentProps {
  teamNameValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDataTransferEnabled: boolean;
  onDataTransferSwitchChange: () => void;
  handleCreateTeamFlow: () => void;
  isCreateTeamLoading: boolean;
}

export const CreateTeamFormContent = ({
  teamNameValue,
  handleChange,
  isDataTransferEnabled,
  onDataTransferSwitchChange,
  handleCreateTeamFlow,
  isCreateTeamLoading,
}: CreateTeamFormContentProps) => {
  const { isLoggedIn, hasWeb3Connection } = useAuth();

  // data transfer is not available for connected with metamask users (hasWeb3Connection)
  const isDataTransferAvailable = isLoggedIn && !hasWeb3Connection;

  const { classes } = useCreateTeamFormStyles();

  return (
    <Paper className={classes.createTeamFormRoot}>
      <div className={classes.createTeamFormInner}>
        <Typography variant="h6">
          {t('teams.create-team-form.title')}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          {t('teams.create-team-form.description')}
        </Typography>
      </div>

      <hr className={classes.divider} />

      <div className={classes.createTeamFormInner}>
        <div>
          <TeamNameInput
            teamNameValue={teamNameValue}
            handleChange={handleChange}
          />

          <Typography
            className={classes.helperText}
            variant="body3"
            component="p"
            color="textSecondary"
          >
            {t('teams.create-team-form.helper-text')}
          </Typography>
        </div>

        {isDataTransferAvailable && (
          <DataTransferSection
            isDataTransferEnabled={isDataTransferEnabled}
            onDataTransferSwitchChange={onDataTransferSwitchChange}
          />
        )}

        <LoadingButton
          className={classes.createTeamButton}
          size="large"
          onClick={handleCreateTeamFlow}
          loading={isCreateTeamLoading}
          disabled={!teamNameValue}
        >
          {t('teams.create-team-form.create-team-button')}
        </LoadingButton>
      </div>
    </Paper>
  );
};
