import { t } from '@ankr.com/common';
import { Button, Skeleton, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { useClickHandler } from 'domains/chains/components/ChainsItemBase/components/Card/hooks/useClickHandler';
import { Timeframe, Chain } from 'domains/chains/types';
import { useChainCardStyles } from './useChainCardStyles';
import { useChainIcon } from 'uiKit/hooks/useChainIcon';
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
}

export const BaseChainsCard = ({
  chain,
  buttonClassName,
  buttonText = t('chains.endpoints-and-more'),
  className,
  onClick,
  timeframe,
  totalRequests,
  loading,
  badge,
}: IBaseChainCardProps) => {
  const { classes, cx } = useChainCardStyles();

  const { name, coinName, id } = chain;

  const icon = useChainIcon(id);

  const onClickDefault = useClickHandler(id);

  return (
    <div
      className={cx(classes.root, className)}
      onClick={onClick ?? onClickDefault}
      role="button"
      tabIndex={0}
    >
      <div className={classes.mainInfo}>
        <div>
          <Typography className={classes.title}>{name}</Typography>
          <Typography className={classes.subtitle}>
            {coinName.toUpperCase()}
          </Typography>
        </div>
        {badge && <div className={classes.badge}>{badge}</div>}
        <img src={icon} className={classes.icon} alt={id} />
      </div>
      <div>
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
        <Button
          className={cx(classes.button, buttonClassName)}
          fullWidth
          size="large"
          variant="outlined"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
