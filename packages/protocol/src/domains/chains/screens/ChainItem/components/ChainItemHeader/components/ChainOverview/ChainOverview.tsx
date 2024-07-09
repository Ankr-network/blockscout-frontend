import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { Chain, ChainSubType, ChainType } from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { ChainRequestsLabel } from 'domains/chains/components/ChainRequestsLabel';
import { ChainLabel } from 'modules/common/components/ChainMainInfo/ChainLabel';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { PremiumLabel } from 'modules/common/components/GetStartedSection/components/PremiumLabel';

import { ChainDocsLink } from '../ChainDocsLink';
import { ChainLogo } from '../ChainLogo';
import { useChainOverviewStyles } from './ChainOverviewStyles';

export interface ChainOverviewProps {
  chain: Chain;
  chainType: ChainType;
  chainSubType?: ChainSubType;
  group: EndpointGroup;
  isChainArchived: boolean;
  isEnterprise: boolean;
  hasMetamaskButton?: boolean;
  isPremiumChain?: boolean;
}

export const ChainOverview = ({
  chain,
  chainSubType,
  chainType,
  group,
  hasMetamaskButton,
  isChainArchived,
  isEnterprise,
  isPremiumChain = true,
}: ChainOverviewProps) => {
  const { classes, cx } = useChainOverviewStyles();

  const { coinName, id, name } = chain;

  useOnMount(() => {
    const h1Tag = document.getElementById('chain-item-title');

    if (h1Tag) {
      h1Tag.innerHTML = name;
    }
  });

  return (
    <div>
      <div className={classes.chainOverview}>
        <div className={classes.left}>
          <ChainLogo chain={chain} />
          <div className={classes.description}>
            <h1 className={classes.top}>
              <Typography variant="subtitle2" color="textPrimary">
                {name}
              </Typography>
              <ChainRequestsLabel
                descriptionClassName={classes.coinName}
                description={coinName}
                descriptionColor="textSecondary"
              />
            </h1>

            <div className={classes.chips}>
              {isPremiumChain && (
                <div className={cx(isChainArchived && classes.dot)}>
                  <PremiumLabel
                    hasGradientBackground
                    className={classes.premiumChip}
                    label="Premium only"
                  />
                </div>
              )}

              {isChainArchived && (
                <ChainLabel
                  isCheckIconVisible
                  label={t('chains.archive')}
                  labelClassName={classes.archiveLabel}
                />
              )}
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <ChainDocsLink id={id} size="small" className={classes.docsLink} />
          {hasMetamaskButton && (
            <AddNetworkButton
              chainType={chainType}
              chainSubType={chainSubType}
              className={classes.addNetworkButton}
              group={group}
              chain={chain}
              isEnterprise={isEnterprise}
              size="small"
            />
          )}
        </div>
      </div>
    </div>
  );
};
