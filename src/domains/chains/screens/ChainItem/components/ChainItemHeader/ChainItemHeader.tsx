import React from 'react';
import { Typography, Button } from '@material-ui/core';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { ArrowRightIcon } from 'uiKit/Icons/ArrowRightIcon';
import { ChainMainInfo } from 'domains/chains/screens/Chains/components/ChainMainInfo';
import chainLogo from 'domains/chains/screens/Chains/components/ChainMainInfo/assets/logo-mock.svg';
import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './ChainItemHeaderStyles';

export const ChainItemHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <ChainMainInfo
          logoSrc={chainLogo}
          name="Polygon"
          description="MATIC"
          descriptionClassName={classes.description}
        />
        <div className={classes.right}>
          <CopyToClipIcon
            className={classes.copyToClip}
            text="https://mrpc.com/matic"
            message={t('common.copy-message')}
            copyText="copyText"
            textColor="textPrimary"
            size="l"
          />
        </div>
      </div>
      <div className={classes.bottom}>
        <Typography variant="body2" className={classes.text}>
          {t('chain-item.header.bottom')}
        </Typography>
        <Button endIcon={<ArrowRightIcon className={classes.icon} />}>
          {t('chain-item.header.button')}
        </Button>
      </div>
    </div>
  );
};
