import { t } from '@ankr.com/common';
import { Button, Skeleton, Typography } from '@mui/material';
import { useClickHandler } from 'domains/chains/components/ChainsItemBase/components/Card/hooks/useClickHandler';
import { TimeframeSwitcher } from 'domains/chains/components/TimeframeSwitcher';
import { Chain, Timeframe } from 'domains/chains/types';
import { useChainCardStyles } from './useChainCardStyles';

export interface IBaseChainCardProps {
  timeframe: Timeframe;
  chain: Chain;
  switchTimeframe: () => void;
  totalRequests: string;
  loading: boolean;
}

export const BaseChainsCard = ({
  chain,
  timeframe,
  switchTimeframe,
  totalRequests,
  loading,
}: IBaseChainCardProps) => {
  const { classes } = useChainCardStyles();

  const { name, icon, coinName, id } = chain;

  const onClick = useClickHandler(id);

  return (
    <div className={classes.root} onClick={onClick} role="button" tabIndex={0}>
      <div className={classes.maininfo}>
        <div>
          <Typography className={classes.title}>{name}</Typography>
          <Typography className={classes.subtitle}>
            {coinName.toUpperCase()}
          </Typography>
        </div>
        <img src={icon} className={classes.icon} alt="ethereum" />
      </div>
      <div>
        <Typography className={classes.information}>
          {loading ? (
            <Skeleton className={classes.skeleton} />
          ) : (
            <>
              {!!totalRequests && (
                <>
                  {t('chains.req', {
                    value: totalRequests,
                  })}{' '}
                  <TimeframeSwitcher
                    timeframe={timeframe}
                    onSwitch={switchTimeframe}
                  />
                </>
              )}
            </>
          )}
        </Typography>
        <Button fullWidth className={classes.button} variant="outlined">
          {t('chains.endpoints-and-more')}
        </Button>
      </div>
    </div>
  );
};
