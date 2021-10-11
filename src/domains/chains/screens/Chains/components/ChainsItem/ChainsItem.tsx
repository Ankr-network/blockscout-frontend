import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { t } from 'modules/i18n/utils/intl';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { useStyles } from './ChainsItemStyles';
import { ChainsItemProps } from './ChainsItemTypes';

export const ChainsItem = ({
  logoSrc,
  name,
  requestInfo,
  period,
  chainLink,
  chainDetailsLink,
}: ChainsItemProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <img className={classes.logo} src={logoSrc} alt="logo" />
        <div className={classes.right}>
          <Typography variant="h4" noWrap className={classes.title}>
            {name}
          </Typography>
          <div className={classes.info}>
            <Typography variant="subtitle2" noWrap>
              {requestInfo}
            </Typography>
            <Typography
              className={classes.label}
              variant="caption"
              color="textSecondary"
            >
              {period}
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.bottom}>
        <CopyToClipIcon text={chainLink} message={t('common.copy-message')} />
        <Button variant="outlined" color="primary" className={classes.button}>
          <Link to={chainDetailsLink}>{t('chains.more-details')}</Link>
        </Button>
      </div>
    </div>
  );
};
