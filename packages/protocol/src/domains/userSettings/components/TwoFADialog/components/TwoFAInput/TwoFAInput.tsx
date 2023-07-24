import { tHTML } from '@ankr.com/common';
import { useCallback, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Warning } from '@ankr.com/ui';

import { LoadingButton } from 'uiKit/LoadingButton';
import { USER_SETTINGS_INTL_ROOT } from 'domains/userSettings/screens/Settings/components/TwoFABlock/constants';

import { useTwoFAInputStyles } from './TwoFAInputStyles';
import { AuthCodeInput } from '../AuthCodeInput';

const TWO_FA_CODE_LENGTH = 6;

interface TwoFAInputProps {
  buttonText: string;
  onConfirm: (value: string) => void;
  errorMessage?: string;
  onReset?: () => void;
  isLoading?: boolean;
}

export const TwoFAInput = ({
  buttonText,
  onConfirm,
  errorMessage,
  onReset,
  isLoading,
}: TwoFAInputProps) => {
  const { classes } = useTwoFAInputStyles();

  const [result, setResult] = useState<string>('');

  const isFullLengthCode = result?.length === TWO_FA_CODE_LENGTH;
  const hasError = Boolean(errorMessage);

  const handleSetResult = useCallback(
    (value: string) => {
      setResult(value);

      if (hasError && typeof onReset === 'function') {
        onReset();
      }
    },
    [hasError, onReset],
  );

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();

      if (isFullLengthCode) {
        onConfirm(result);
      }
    },
    [result, isFullLengthCode, onConfirm],
  );

  return (
    <Box>
      <Typography className={classes.description} variant="body1">
        {tHTML(`${USER_SETTINGS_INTL_ROOT}.enter-code-dialog.description`)}
      </Typography>
      <form onSubmit={handleSubmit}>
        <input type="submit" hidden />
        <AuthCodeInput onChange={handleSetResult} hasError={hasError} />
        {hasError && (
          <Box className={classes.message}>
            <Warning color="error" />
            <Typography
              className={classes.messageText}
              variant="body2"
              color="error"
            >
              {errorMessage}
            </Typography>
          </Box>
        )}
        <LoadingButton
          fullWidth
          size="large"
          className={classes.button}
          disabled={!isFullLengthCode || isLoading}
          loading={isLoading}
          onClick={() => onConfirm(result)}
        >
          {buttonText}
        </LoadingButton>
      </form>
    </Box>
  );
};
