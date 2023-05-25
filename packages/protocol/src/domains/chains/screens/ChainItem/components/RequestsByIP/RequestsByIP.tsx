import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { UserRequestsByIpData } from 'domains/chains/hooks/useUserRequestsByIp';
import { Timeframe } from 'domains/chains/types';
import { formatNumber } from 'modules/common/components/StakeBarChart/StakeBarChartUtils';
import { useCallback, useMemo } from 'react';
import { OverlaySpinner } from '@ankr.com/ui';
import { ItemHeader } from '../ItemHeader';
import { NoData } from '../MethodCalls/components/NoData';
import { useRequestsByIPStyles } from './useRequestsByIPStyles';

interface IUserRequestsByIpProps {
  loading: boolean;
  data?: UserRequestsByIpData[];
  timeframe: Timeframe;
}

export const RequestsByIP = ({
  loading,
  data = [],
  timeframe,
}: IUserRequestsByIpProps) => {
  const { classes } = useRequestsByIPStyles();

  const maxCounts = useMemo(
    () => Math.max(...data.map(item => item.count)),
    [data],
  );

  const renderLine = useCallback(
    (counts: number) => {
      const result = `${Math.ceil((counts / maxCounts) * 100)}%`;

      return result;
    },
    [maxCounts],
  );

  return (
    <div className={classes.root}>
      <div className={classes.titleRow}>
        <ItemHeader
          timeframe={timeframe}
          title={t('chain-item.requests-by-ip.title')}
        />
      </div>

      {loading ? (
        <div className={classes.loading}>
          <OverlaySpinner />
        </div>
      ) : (
        <>
          {data.length > 0 ? (
            <>
              <div className={classes.legend}>
                <Typography variant="body2" className={classes.legendText}>
                  {t('chain-item.requests-by-ip.ip')}
                </Typography>
                <Typography variant="body2" className={classes.legendText}>
                  {t('chain-item.requests-by-ip.http')}
                </Typography>
              </div>
              <div className={classes.content}>
                <div className={classes.info}>
                  {data.map(item => (
                    <div className={classes.line} key={item.ip}>
                      <Typography variant="body1" className={classes.infoText}>
                        {item.ip}
                      </Typography>
                      <Typography
                        noWrap
                        variant="body1"
                        className={classes.infoText}
                      >
                        {formatNumber(item.count)}
                      </Typography>
                    </div>
                  ))}
                </div>
                <div className={classes.graphic}>
                  {data.map(item => (
                    <div
                      className={classes.graphicLine}
                      key={item.ip}
                      style={{ width: renderLine(item.count) }}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className={classes.noData}>
              <NoData />
            </div>
          )}
        </>
      )}
    </div>
  );
};
