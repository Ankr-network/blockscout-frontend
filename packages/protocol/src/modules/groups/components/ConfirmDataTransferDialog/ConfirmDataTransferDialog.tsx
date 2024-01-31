import { Button, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { ChangeEvent } from 'react';
import { LoadingButton } from '@ankr.com/ui';

import { Dialog } from 'uiKit/Dialog';
import { ANKR_DOCS_TEAM_ACCOUNTS_LINK } from 'modules/common/constants/const';
import { ConfirmInput } from 'domains/userSettings/components/ConfirmInput';

import { useConfirmDataTransferDialogStyles } from './useConfirmDataTransferDialogStyles';
import { CONFIRM_PHRASE } from './hooks/useConfirmDataTransferDialog';

interface ConfirmDataTransferDialogProps {
  isOpened?: boolean;
  onClose: () => void;
  onConfirmButtonClick: () => void;
  confirmInputValue: string;
  onChangeConfirmInputValue: (event: ChangeEvent<HTMLInputElement>) => void;
  confirmInputError?: string;
  isLoading?: boolean;
}

export const ConfirmDataTransferDialog = ({
  isOpened = false,
  onClose,
  onConfirmButtonClick,
  confirmInputValue,
  onChangeConfirmInputValue,
  confirmInputError,
  isLoading = false,
}: ConfirmDataTransferDialogProps) => {
  const { classes } = useConfirmDataTransferDialogStyles();

  return (
    <Dialog
      onClose={onClose}
      open={isOpened}
      paperClassName={classes.confirmDataTransferDialogRoot}
      title={t('teams.create-team-confirm-data-dialog.title')}
      titleClassName={classes.confirmDataTransferDialogTitle}
    >
      <div className={classes.confirmDataTransferDialogInner}>
        <Typography
          component="div"
          variant="body2"
          color="textSecondary"
          className={classes.confirmDataTransferDialogDescription}
        >
          {tHTML('teams.create-team-confirm-data-dialog.description', {
            href: ANKR_DOCS_TEAM_ACCOUNTS_LINK,
          })}
        </Typography>

        <Typography
          component="div"
          variant="subtitle2"
          className={classes.confirmDataTransferWarning}
        >
          {t('teams.create-team-confirm-data-dialog.warning')}
        </Typography>

        <ConfirmInput
          label={t('teams.create-team-confirm-data-dialog.label', {
            confirmationPhrase: CONFIRM_PHRASE,
          })}
          placeholder={t('teams.create-team-confirm-data-dialog.placeholder')}
          value={confirmInputValue}
          error={confirmInputError}
          onChangeValue={onChangeConfirmInputValue}
        />

        <div className={classes.confirmDataTransferDialogButtons}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            onClick={onConfirmButtonClick}
            size="large"
          >
            {t('teams.create-team-confirm-data-dialog.button-confirm')}
          </LoadingButton>

          <Button
            disabled={isLoading}
            fullWidth
            onClick={onClose}
            size="large"
            variant="outlined"
          >
            {t('teams.create-team-confirm-data-dialog.button-cancel')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
