import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ChainRequestsLabel } from 'domains/chains/components/ChainRequestsLabel';
import { PremiumLabel } from 'modules/common/components/GetStartedSection/components/PremiumLabel';
import { ChainLabel } from 'modules/common/components/ChainMainInfo/ChainLabel';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useAppSelector } from 'store/useAppSelector';
import { selectNodesDetails } from 'modules/chains/store/selectors';
import { Chain } from 'modules/chains/types';
import { checkIsArchive } from 'modules/chains/utils/isArchive';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

import { ChainLogo } from '../ChainLogo';
import { useChainDescriptionStyles } from './useChainDescriptionStyles';

interface IChainDescriptionProps {
  className?: string;
  chain: Chain;
  logoSize?: number;
  subchainLabels?: string[];
  isCompactView?: boolean;
}

export const ChainDescription = ({
  chain,
  className,
  isCompactView,
  logoSize,
  subchainLabels,
}: IChainDescriptionProps) => {
  const { hasPremium } = useAuth();
  const { isEnterpriseClient } = useEnterpriseClientStatus();

  const { coinName, id, name } = chain;

  const { data: nodes = [] } = useAppSelector(selectNodesDetails);

  const isArchive = checkIsArchive(nodes, id);

  const hasChainLabels = subchainLabels && subchainLabels?.length > 0;

  const hasPremiumLabel =
    chain.premiumOnly && !hasPremium && !isEnterpriseClient;

  const hasLabels = hasPremiumLabel || isArchive || hasChainLabels;

  const { classes, cx } = useChainDescriptionStyles();

  return (
    <div className={cx(classes.chainDescriptionRoot, className)}>
      <ChainLogo chain={chain} size={logoSize} />
      <div className={classes.description}>
        <h1
          className={cx(classes.top, {
            [classes.topWithMargin]: !isCompactView,
          })}
        >
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={cx(classes.chainName, {
              [classes.chainNameSmall]: isCompactView,
            })}
          >
            {name}
          </Typography>
          <ChainRequestsLabel
            descriptionClassName={cx(classes.coinName, {
              [classes.coinNameSmall]: isCompactView,
            })}
            description={coinName}
            descriptionColor="textSecondary"
          />
        </h1>

        {hasLabels && (
          <div className={classes.chips}>
            {isArchive && (
              <div className={cx(hasPremiumLabel && classes.dot)}>
                <ChainLabel
                  isCheckIconVisible
                  label={t('chains.archive')}
                  labelClassName={classes.archiveLabel}
                />
              </div>
            )}

            {hasPremiumLabel && (
              <PremiumLabel
                hasGradientBackground
                className={classes.premiumChip}
                label="Premium only"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
