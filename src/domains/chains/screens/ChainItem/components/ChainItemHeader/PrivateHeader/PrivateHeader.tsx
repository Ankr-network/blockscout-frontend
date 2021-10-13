import React from 'react';
import { Typography, Button } from '@material-ui/core';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './useStyles';

interface PrivateHeaderProps {
  chainLinks: string[];
}

export const PrivateHeader = ({ chainLinks }: PrivateHeaderProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={classes.left}>
          <Typography variant="body2" className={classes.text}>
            {t('chain-item.header.bottom')}
          </Typography>
          <ChainRequestsLabel
            description="472 952 req"
            descriptionColor="textSecondary"
            label="24h"
          />
          <ChainRequestsLabel
            description="472 952 req"
            descriptionColor="textSecondary"
            label="sec"
          />
        </div>
        <Button variant="text">{t('chain-item.header.settings-button')}</Button>
      </div>

      <div className={classes.bottom}>
        {chainLinks.map(link => (
          <CopyToClipIcon
            text={link}
            message={t('common.copy-message')}
            key={link}
            size="l"
            textColor="textPrimary"
            className={classes.copyToClip}
          />
        ))}
      </div>
    </div>
  );
};
