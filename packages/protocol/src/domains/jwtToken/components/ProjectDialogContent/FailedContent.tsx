import { t } from '@ankr.com/common';
import { LoadingButton } from '@ankr.com/ui';
import { Button, Typography } from '@mui/material';
import { jwtTokenIntlRoot } from 'domains/jwtToken/utils/utils';
import { useProjectDialogContentStyles } from './useProjectDialogContentStyles';

interface IFailedContentProps {
  isLoading: boolean;
  onClose: () => void;
  tryAgain: () => void;
}

export const FailedContent = ({
  isLoading,
  onClose,
  tryAgain,
}: IFailedContentProps) => {
  const { classes } = useProjectDialogContentStyles();

  return (
    <div>
      <Typography className={classes.info} component="div">
        {t(`${jwtTokenIntlRoot}.failed.info`)}
      </Typography>
      <div className={classes.group}>
        <LoadingButton
          fullWidth
          size="large"
          color="error"
          onClick={tryAgain}
          loading={isLoading}
        >
          {t(`${jwtTokenIntlRoot}.failed.try-again`)}
        </LoadingButton>
        <Button
          fullWidth
          size="large"
          variant="outlined"
          color="error"
          onClick={onClose}
        >
          {t(`${jwtTokenIntlRoot}.close`)}
        </Button>
      </div>
    </div>
  );
};
