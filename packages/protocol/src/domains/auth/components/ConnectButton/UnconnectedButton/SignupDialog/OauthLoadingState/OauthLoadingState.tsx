import { Box, Typography } from '@mui/material';
import { Google, Github } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useLoadingStateStyles } from './useLoadingStateStyles';
import { OauthLoginType } from '../SignupDialogContent/SignupDialogDefaultContent';

interface OauthLoadingStateProps {
  loginType?: OauthLoginType;
}

const styles = { width: 80, height: 80 };

export const OauthLoadingState = ({
  loginType = OauthLoginType.Google,
}: OauthLoadingStateProps) => {
  const { classes } = useLoadingStateStyles();
  const isGithubLogin = loginType === OauthLoginType.Github;

  return (
    <Box className={classes.root}>
      {isGithubLogin ? <Github style={styles} /> : <Google style={styles} />}

      <Typography className={classes.title} variant="h3" color="textPrimary">
        {t(`signup-modal.${loginType}.title`)}
      </Typography>

      <Typography color="textSecondary" variant="body2">
        {t(`signup-modal.${loginType}.description`)}
      </Typography>
    </Box>
  );
};
