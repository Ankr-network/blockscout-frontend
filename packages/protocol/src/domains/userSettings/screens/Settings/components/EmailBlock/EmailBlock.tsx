import { Button, Paper, Typography } from '@material-ui/core';

import { t } from 'common';
import { useStyles } from './EmailBlockStyles';

const CHANGE_EMAIL_ENABLED = false;

interface IEmailBlockProps {
  email?: string;
  onChangeEmail?: () => void;
}

export const EmailBlock = ({ email = '', onChangeEmail }: IEmailBlockProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography className={classes.email} variant="h4">
        {email}
      </Typography>

      {CHANGE_EMAIL_ENABLED && (
        <Button
          className={classes.changeEmailButton}
          variant="outlined"
          onClick={onChangeEmail}
        >
          {t('user-settings.settings-screen.change-email-button')}
        </Button>
      )}
    </Paper>
  );
};
