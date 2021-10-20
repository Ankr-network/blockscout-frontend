import React from 'react';
import { Typography, Button } from '@material-ui/core';

import { CopyToClipButton } from 'uiKit/CopyToClipButton';
import { ArrowRightIcon } from 'uiKit/Icons/ArrowRightIcon';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { fetchChain } from 'domains/chains/actions/fetchChain';
import { formatChains } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListUtils';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { t } from 'modules/i18n/utils/intl';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { useStyles } from './ChainItemHeaderStyles';
import { PrivateHeader } from './PrivateHeader';

interface ChainItemHeaderProps {
  chain: ResponseData<typeof fetchChain>['chain'];
  hasCredentials: boolean;
  icon: string;
  chainId: string;
}

export const ChainItemHeader = ({
  chain,
  hasCredentials,
  icon,
  chainId,
}: ChainItemHeaderProps) => {
  const classes = useStyles();

  const [formattedChain] = formatChains([chain]);
  const { rpcLinks, name } = formattedChain;

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <ChainMainInfo
          logoSrc={icon}
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
      {hasCredentials ? (
        <PrivateHeader chainId={chainId} />
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
