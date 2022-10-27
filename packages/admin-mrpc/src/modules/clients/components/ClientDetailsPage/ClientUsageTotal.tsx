import { Grid, Paper, Skeleton, Typography } from '@mui/material';
import { PrivateStatsInterval } from 'multirpc-sdk';
import { formatNumber } from 'modules/common/utils/renderBalance';
import { timeframeTextMap } from './const';
import { useClientDetailsStyles } from './ClientDetailsStyles';

const skeleton = (
  <Skeleton
    animation="wave"
    style={{ display: 'inline-block' }}
    variant="rectangular"
    width={100}
    height={16}
  />
);

interface IClientUsageTotalProps {
  currentPeriod: PrivateStatsInterval;
  isLoadingStats?: boolean;
  totalCost?: number;
  totalRequestsValue?: number;
  totalCostsValue?: number;
}

export const ClientUsageTotal = ({
  currentPeriod,
  isLoadingStats,
  totalCost,
  totalRequestsValue,
  totalCostsValue,
}: IClientUsageTotalProps) => {
  const { classes } = useClientDetailsStyles();

  const renderGridItem = ({
    title,
    value,
  }: {
    title: string;
    value: string;
  }) => {
    return (
      <Grid item xs={4} component={Paper} className={classes.gridItem}>
        <Typography variant="caption" color="textSecondary" component="p">
          {title}
        </Typography>
        {isLoadingStats ? (
          skeleton
        ) : (
          <>
            {totalCost || totalRequestsValue ? (
              <>
                <Typography variant="subtitle1" component="p">
                  <b> {value}</b>
                </Typography>
                <Typography variant="caption" component="p">
                  in one {timeframeTextMap[currentPeriod]}
                </Typography>
              </>
            ) : (
              <Typography variant="subtitle1" component="p">
                Not found
              </Typography>
            )}
          </>
        )}
      </Grid>
    );
  };

  return (
    <Grid className={classes.gridContainer} container spacing={5} wrap="nowrap">
      {renderGridItem({
        title: 'Requests',
        value: formatNumber(totalRequestsValue),
      })}
      {renderGridItem({
        title: 'Total cost',
        value: formatNumber(totalCostsValue),
      })}
    </Grid>
  );
};
