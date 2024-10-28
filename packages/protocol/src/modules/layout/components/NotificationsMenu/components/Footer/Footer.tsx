import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { NotificationsRoutesConfig } from 'domains/notifications/Routes';

import { notificationsMenuTranslation } from '../../translation';
import { useFooterStyles } from './useFooterStyles';

interface IFooterProps {
  isDisabled: boolean;
  onClick: () => void;
}

export const Footer = ({ isDisabled, onClick }: IFooterProps) => {
  const { classes } = useFooterStyles();
  const { keys, t } = useTranslation(notificationsMenuTranslation);

  return (
    <div className={classes.root}>
      <Button
        disabled={isDisabled}
        to={NotificationsRoutesConfig.notifications.generatePath()}
        onClick={onClick}
        variant="text"
        component={Link}
      >
        <Typography variant="body3">{t(keys.viewAll)}</Typography>
      </Button>
    </div>
  );
};
