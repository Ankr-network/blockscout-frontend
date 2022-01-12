import { Paper, Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import React, { ReactNode } from 'react';
import { Button } from 'uiKit/Button';
import { Container } from 'uiKit/Container';
import { useConnectStyles } from './useConnectStyles';

interface IConnectProps {
  onConnectClick?: () => void;
  btnDisabled?: boolean;
  info?: ReactNode;
  networksSlot?: ReactNode;
}

export const Connect = ({
  onConnectClick,
  btnDisabled,
  info,
  networksSlot,
}: IConnectProps) => {
  const classes = useConnectStyles();

  return (
    <Container>
      <Paper className={classes.box}>
        <div className={classes.headerContainer}>
          <Typography variant="h3">{t('connect.access-request')}</Typography>
        </div>

        <Typography className={classes.question}>
          {t('connect.ask-connect')}
        </Typography>

        <Button
          color="primary"
          size="large"
          fullWidth
          onClick={onConnectClick}
          className={classes.button}
          disabled={btnDisabled}
        >
          {t('connect.grant')}
        </Button>

        <Typography className={classes.info} color="textSecondary">
          {info || t('connect.info')}
        </Typography>

        {networksSlot && (
          <div className={classes.networksWrapper}>
            <Typography variant="h5" className={classes.networksTitle}>
              {t('connect.available-networks')}
            </Typography>

            {networksSlot}
          </div>
        )}
      </Paper>
    </Container>
  );
};
