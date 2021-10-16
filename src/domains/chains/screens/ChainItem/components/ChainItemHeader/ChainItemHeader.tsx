import React from 'react';
import { Typography, Button } from '@material-ui/core';

import { CopyToClipButton } from 'uiKit/CopyToClipButton';
import { ArrowRightIcon } from 'uiKit/Icons/ArrowRightIcon';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { fetchChainItem } from 'domains/chains/actions/fetchChainItem';
import { formatChains } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListUtils';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { t } from 'modules/i18n/utils/intl';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { useStyles } from './ChainItemHeaderStyles';
import { PrivateHeader } from './PrivateHeader';

interface ChainItemHeaderProps {
  chain: ResponseData<typeof fetchChainItem>['chain'];
}

export const ChainItemHeader = ({ chain }: ChainItemHeaderProps) => {
  const { hasAccount } = useAuth();

  const classes = useStyles();

  const [formattedChain] = formatChains([chain]);
  const { rpcLinks, name } = formattedChain;

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <ChainMainInfo
          logoSrc=""
          name={name}
          description={
            <ChainRequestsLabel
              description={name}
              descriptionColor="textSecondary"
            />
          }
        />
        <div className={classes.right}>
          {rpcLinks.map(link => (
            <CopyToClipButton
              text={link}
              key={link}
              textMessage={t('common.copy-message')}
              buttonText={t('common.copy-text')}
              className={classes.copyToClip}
            />
          ))}
        </div>
      </div>
      {hasAccount ? (
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
