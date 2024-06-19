import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';
import { ChangeEvent } from 'react';

import { ConfirmInput } from 'domains/userSettings/components/ConfirmInput';

import { useConfirmStepStyles } from './useConfirmStepStyles';

interface IConfirmStepProps {
  selectedUserEmail?: string;
  inputValue: string;
  inputError?: string;
  userName?: string;
  onChangeInputValue: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ConfirmStep = ({
  inputError,
  inputValue,
  onChangeInputValue,
  selectedUserEmail,
  userName,
}: IConfirmStepProps) => {
  const { classes } = useConfirmStepStyles();

  return (
    <>
      <Typography
        component="div"
        variant="body2"
        className={classes.description}
      >
        {t('teams.transfer-ownership.confirm-step.description', {
          email: selectedUserEmail,
        })}
      </Typography>

      <ConfirmInput
        label={t('teams.transfer-ownership.confirm-step.input-label', {
          userName,
        })}
        placeholder={t(
          'teams.transfer-ownership.confirm-step.input-placeholder',
          {
            userName,
          },
        )}
        value={inputValue}
        error={inputError}
        onChangeValue={onChangeInputValue}
      />
    </>
  );
};
