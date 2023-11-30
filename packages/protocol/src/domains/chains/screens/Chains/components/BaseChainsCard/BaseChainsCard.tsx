import { t } from '@ankr.com/common';
import { Button, Skeleton, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { useChainItemClickHandler } from 'modules/common/hooks/useChainItemClickHandler';
import { Timeframe, Chain } from 'modules/chains/types';
import { useChainIcon } from 'uiKit/hooks/useChainIcon';
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
  chain,
  buttonClassName,
  buttonText,
  className,
  onClick,
  timeframe,
  totalRequests,
  loading,
  badge,
  hasTotalRequestsLabel = true,
}: IBaseChainCardProps) => {
  const { classes, cx } = useChainCardStyles();

  const { name, coinName, id } = chain;

  const icon = useChainIcon(id);

  const onClickDefault = useChainItemClickHandler(
    ChainsRoutesConfig.chainDetails.generatePath(id),
  );

  return (
    <div
      className={cx(classes.root, className)}
      onClick={onClick ?? onClickDefault}
      role="button"
      tabIndex={0}
    >
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
      <div>
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
    </div>
  );
};
