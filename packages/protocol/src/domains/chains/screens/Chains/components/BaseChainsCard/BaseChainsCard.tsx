import { t } from '@ankr.com/common';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { Timeframe, Chain } from 'modules/chains/types';
import { useChainIcon } from 'uiKit/hooks/useChainIcon';
import { NavLink } from 'uiKit/NavLink';
import { ChainsRoutesConfig } from 'domains/chains/routes';

import { useChainCardStyles } from './useChainCardStyles';
import { Information } from './Information';

export interface IBaseChainCardProps {
  timeframe: Timeframe;
  buttonClassName?: string;
  buttonText?: ReactNode;
  chain: Chain;
  className?: string;
  onClick?: () => void;
  totalRequests: string;
  loading: boolean;
  badge?: ReactNode;
  hasTotalRequestsLabel?: boolean;
}

export const BaseChainsCard = ({
  badge,
  buttonClassName,
  buttonText,
  chain,
  className,
  hasTotalRequestsLabel = true,
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
        <div className={classes.info}>
          <Typography className={classes.title} component="p">
            {name}
          </Typography>
          <Typography className={classes.subtitle}>
            {coinName.toUpperCase()}
          </Typography>
        </div>
        {badge && <div className={classes.badge}>{badge}</div>}
        <img src={icon} className={classes.icon} alt={id} />
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
        <Button
          className={cx(classes.button, buttonClassName)}
          fullWidth
          size="large"
          variant="outlined"
        >
          {buttonText || t('chains.endpoints-and-more')}
        </Button>
      </div>
    </Box>
  );
};
