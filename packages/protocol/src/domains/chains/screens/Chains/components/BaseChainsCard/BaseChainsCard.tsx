import { Box, Skeleton, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { NavLink } from 'uiKit/NavLink';
import { Timeframe, Chain } from 'modules/chains/types';
import { Placeholder } from 'modules/common/components/Placeholder';

import { BlockchainInfo } from './components/BlockchainInfo';
import { Information } from './components/Information';
import { useChainCardStyles } from './useChainCardStyles';

export interface IBaseChainCardProps {
  badge?: ReactNode;
  chain: Chain;
  className?: string;
  hasTotalRequestsLabel?: boolean;
  isPremiumOnly?: boolean;
  loading: boolean;
  onClick?: () => void;
  timeframe: Timeframe;
  totalRequests: string;
}

export const BaseChainsCard = ({
  badge,
  chain,
  className,
  hasTotalRequestsLabel = true,
  isPremiumOnly = false,
  loading,
  onClick,
  timeframe,
  totalRequests,
}: IBaseChainCardProps) => {
  const { classes, cx } = useChainCardStyles();

  const { id } = chain;

  const isSimpleLinkCard = !onClick;

  const props = isSimpleLinkCard
    ? {
        component: NavLink,
        href: ChainsRoutesConfig.chainDetails.generatePath(id),
      }
    : {
        onClick,
      };

  return (
    <Box className={cx(classes.root, className)} {...props}>
      <BlockchainInfo
        badge={badge}
        chain={chain}
        isPremiumOnly={isPremiumOnly}
      />
      <div className={classes.secondInfo}>
        {hasTotalRequestsLabel && (
          <Typography className={classes.information}>
            <Placeholder
              hasPlaceholder={loading}
              placeholder={<Skeleton className={classes.skeleton} />}
            >
              <Information
                timeframe={timeframe}
                totalRequests={totalRequests}
                timeframeClassName={classes.timeSwitcher}
              />
            </Placeholder>
          </Typography>
        )}
      </div>
    </Box>
  );
};
