import { Paper, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';

import { t } from 'modules/i18n/utils/intl';
import { Button } from 'uiKit/Button';
import { Container } from 'uiKit/Container';

import { useConnectStyles } from './useConnectStyles';

interface IConnectProps {
  btnDisabled?: boolean;
  info?: ReactNode;
  networksSlot?: ReactNode;
  onConnectClick?: () => void;
}

export const Connect = ({
  onConnectClick,
  btnDisabled,
  info,
  networksSlot,
}: IConnectProps): JSX.Element => {
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
          fullWidth
          className={classes.button}
          color="primary"
          disabled={btnDisabled}
          size="large"
          onClick={onConnectClick}
        >
          {t('connect.grant')}
        </Button>

        <Typography className={classes.info} color="textSecondary">
          {info || t('connect.info')}
        </Typography>

        {networksSlot && (
          <div className={classes.networksWrapper}>
            <Typography className={classes.networksTitle} variant="h5">
              {t('connect.available-networks')}
            </Typography>

            {networksSlot}
          </div>
        )}
      </Paper>
    </Container>
  );
};
