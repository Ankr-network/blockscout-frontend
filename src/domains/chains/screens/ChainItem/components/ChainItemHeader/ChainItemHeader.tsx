import React from 'react';
import { Typography, Button } from '@material-ui/core';

import { CopyToClipButton } from 'uiKit/CopyToClipButton';
import { ArrowRightIcon } from 'uiKit/Icons/ArrowRightIcon';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { t } from 'modules/i18n/utils/intl';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { CHAINS_MOCK } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListMock';
import { IS_PRIVATE } from 'store';
import { useStyles } from './ChainItemHeaderStyles';
import { PrivateHeader } from './PrivateHeader';

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
          description={
            <ChainRequestsLabel
              description={data.name}
              descriptionColor="textSecondary"
            />
          }
        />
        <div className={classes.right}>
          <CopyToClipButton
            className={classes.copyToClip}
            text={data.chainLink}
            textMessage={t('common.copy-message')}
            buttonText={t('common.copy-text')}
          />
        </div>
      </div>
      {IS_PRIVATE ? (
        <PrivateHeader
          chainLinks={['https://test./v3/1', 'https://test./v3/2']}
        />
      ) : (
        <div className={classes.bottom}>
          <Typography variant="body2" className={classes.text}>
            {t('chain-item.header.bottom')}
          </Typography>
          <Button endIcon={<ArrowRightIcon className={classes.icon} />}>
            {t('chain-item.header.button')}
          </Button>
        </div>
      )}
    </div>
  );
};
