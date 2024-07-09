import { Box, Skeleton, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { Timeframe, Chain } from 'modules/chains/types';
import { useChainIcon } from 'uiKit/hooks/useChainIcon';
import { NavLink } from 'uiKit/NavLink';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { PremiumLabel } from 'modules/common/components/GetStartedSection/components/PremiumLabel';

import { useChainCardStyles } from './useChainCardStyles';
import { Information } from './Information';

export interface IBaseChainCardProps {
  timeframe: Timeframe;
  chain: Chain;
  className?: string;
  onClick?: () => void;
  totalRequests: string;
  loading: boolean;
  badge?: ReactNode;
  isPremiumOnly?: boolean;
  hasTotalRequestsLabel?: boolean;
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

  const { coinName, id, name } = chain;

  const icon = useChainIcon(id);

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
      <div className={classes.mainInfo}>
        <img src={icon} className={classes.icon} alt={id} />
        <div className={classes.info}>
          <Typography
            variant="subtitle1"
            component="div"
            className={classes.title}
          >
            {name}
            {isPremiumOnly && (
              <PremiumLabel
                size="xs"
                hasGradientBackground
                className={classes.chip}
                label="Premium only"
              />
            )}
          </Typography>
          <Typography variant="body3" className={classes.subtitle}>
            {coinName.toUpperCase()}
          </Typography>
        </div>
        {badge && <div className={classes.badge}>{badge}</div>}
      </div>
      <div className={classes.secondInfo}>
        {hasTotalRequestsLabel && (
          <Typography className={classes.information}>
            {loading ? (
              <Skeleton className={classes.skeleton} />
            ) : (
              <Information
                timeframe={timeframe}
                totalRequests={totalRequests}
                timeframeClassName={classes.timeSwitcher}
              />
            )}
          </Typography>
        )}
      </div>
    </Box>
  );
};
