import { IRenameGroupParams } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { Button } from '@mui/material';
import { LoadingButton, TextField } from '@ankr.com/ui';
import { ChangeEvent, useCallback, useState } from 'react';

import { useRenameTeamMutation } from 'domains/userSettings/actions/teams/renameTeam';
import { Dialog } from 'uiKit/Dialog';
import { useAppDispatch } from 'store/useAppDispatch';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { MAX_TEAM_NAME_LENGTH } from 'domains/userSettings/screens/Settings/constants';

import { useRenameTeamDialogStyles } from './useRenameTeamDialogStyles';

export interface IRenameTeamDialogProps extends IRenameGroupParams {
  open: boolean;
  onClose: () => void;
}

export const RenameTeamDialog = ({
  name,
  comment,
  company_type,
  group,
  open,
  onClose,
}: IRenameTeamDialogProps) => {
  const { classes } = useRenameTeamDialogStyles();
  const [inputValue, setInputValue] = useState(name);
  const dispatch = useAppDispatch();

  const [renameTeam, { isLoading }] = useRenameTeamMutation();

  const onChangeInputValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    [],
  );

  const handleRename = useCallback(async () => {
    if (inputValue && inputValue !== name) {
      const result = await renameTeam({
        name: inputValue,
        comment,
        group,
        company_type,
      });

      if (isMutationSuccessful(result)) {
        dispatch(
          NotificationActions.showNotification({
            message: t('teams.rename-team.notifications.success', {
              name: inputValue,
            }),
            severity: 'success',
          }),
        );
      }
    }

    onClose();
  }, [
    inputValue,
    name,
    onClose,
    renameTeam,
    comment,
    group,
    company_type,
    dispatch,
  ]);

  return (
    <Dialog
      maxPxWidth={600}
      onClose={onClose}
      open={open}
      paperClassName={classes.root}
      title={t('teams.rename-team.title')}
    >
      <TextField
        fullWidth
        className={classes.input}
        value={inputValue}
        label={t('teams.rename-team.label')}
        onChange={onChangeInputValue}
        maxLength={MAX_TEAM_NAME_LENGTH}
      />

      <LoadingButton
        fullWidth
        className={classes.removeButton}
        loading={isLoading}
        onClick={handleRename}
        disabled={!inputValue}
      >
        {t('teams.rename-team.save')}
      </LoadingButton>
      <Button fullWidth variant="outlined" onClick={onClose}>
        {t('teams.rename-team.cancel')}
      </Button>
    </Dialog>
  );
};
