import { Link } from 'react-router-dom';
import { Gear } from '@ankr.com/ui';
import { IconButton, Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';

import { notificationsMenuTranslation } from '../../translation';
import { useHeaderStyles } from './useHeaderStyles';

export const Header = () => {
  const { classes } = useHeaderStyles();
  const { keys, t } = useTranslation(notificationsMenuTranslation);

  return (
    <div className={classes.root}>
      <Typography variant="subtitle2">{t(keys.title)}</Typography>
      <IconButton
        to={UserSettingsRoutesConfig.settings.generatePath()}
        className={classes.button}
        component={Link}
      >
        <Gear className={classes.icon} />
      </IconButton>
    </div>
  );
};
