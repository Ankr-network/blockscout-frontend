import { tHTML } from '@ankr.com/common';
import { useCallback, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Warning } from '@ankr.com/ui';

import { useTwoFAInputStyles } from './TwoFAInputStyles';
import { AuthCodeInput } from '../AuthCodeInput';
import { USER_SETTINGS_INTL_ROOT } from 'domains/userSettings/screens/Settings/components/TwoFABlock/constants';

const TWO_FA_CODE_LENGTH = 6;

interface TwoFAInputProps {
  buttonText: string;
  onConfirm: (value: string) => void;
  errorMessage?: string;
  onReset?: () => void;
}

export const TwoFAInput = ({
  buttonText,
  onConfirm,
  errorMessage,
  onReset,
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
        <Button
          fullWidth
          size="large"
          className={classes.button}
          disabled={!isFullLengthCode}
          onClick={() => onConfirm(result)}
        >
          {buttonText}
        </Button>
      </form>
    </Box>
  );
};
