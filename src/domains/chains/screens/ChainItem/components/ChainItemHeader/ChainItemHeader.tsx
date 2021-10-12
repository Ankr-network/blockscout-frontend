import React from 'react';
import { Typography, Button } from '@material-ui/core';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { ArrowRightIcon } from 'uiKit/Icons/ArrowRightIcon';
import { ChainMainInfo } from 'domains/chains/screens/Chains/components/ChainMainInfo';
import { t } from 'modules/i18n/utils/intl';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { CHAINS_MOCK } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListMock';
import { useStyles } from './ChainItemHeaderStyles';

export const ChainItemHeader = () => {
  const classes = useStyles();
  const { chainId } = ChainsRoutesConfig.chainDetails.useParams();

  const data: any =
    CHAINS_MOCK.find((item: any) => chainId === item.name) || {};

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <ChainMainInfo
          logoSrc={data.chainLogo}
          name={data.name}
          description={data.name}
          descriptionClassName={classes.description}
        />
        <div className={classes.right}>
          <CopyToClipIcon
            className={classes.copyToClip}
            text={data.chainLink}
            message={t('common.copy-message')}
            copyText={t('common.copy-text')}
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
