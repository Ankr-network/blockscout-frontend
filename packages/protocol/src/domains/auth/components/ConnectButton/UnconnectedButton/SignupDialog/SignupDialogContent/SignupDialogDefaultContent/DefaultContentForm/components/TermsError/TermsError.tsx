import { Box } from '@mui/material';
import { Warning } from '@ankr.com/ui';

import { useTermsErrorStyles } from './useTermsErrorStyles';

export interface ITermsErrorProps {
  error?: string;
}

export const TermsError = ({ error }: ITermsErrorProps) => {
  const { classes } = useTermsErrorStyles();

  if (!error) {
    return null;
  }

  return (
    <Box className={classes.root}>
      <Warning color="error" className={classes.icon} /> {error}
    </Box>
  );
};
