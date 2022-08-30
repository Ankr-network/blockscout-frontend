import { useMemo, useState } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { t } from 'modules/i18n/utils/intl';
import { NoData } from '../MethodCalls/components/NoData';
import { RequestsMapProps } from './RequestsMapTypes';
import { getMarkerPointsAndStats } from './RequestsMapUtils';
import { StatsMap } from './StatsMap';
import { StatsTable } from './StatsTable';

import { Timeframe } from 'domains/chains/types';
import { ItemHeader } from '../ItemHeader';
import { useStyles } from './useStyles';

export const RequestsMap = ({ countries, timeframe }: RequestsMapProps) => {
  const classes = useStyles();
  const [country, setCountry] = useState<string>('');

  // TODO: remove when BE releases add all timeframe support for Premium
  const { isWalletConnected } = useAuth();

  const data = useMemo(() => getMarkerPointsAndStats(countries), [countries]);

  return (
    <div className={classes.root}>
      {/* Since request by ip only support 30d by backend, so hard code it first. When backend support all the timeframe should be remove it  */}
      <ItemHeader
        timeframe={isWalletConnected ? Timeframe.Month : timeframe}
        title={t('chain-item.map.header')}
      />
      <div className={classes.container}>
        {data.length ? (
          <>
            <StatsTable data={data} selectedCountry={country} />
            <div className={classes.mapContainer}>
              <StatsMap data={data} setCountry={setCountry} />
            </div>
          </>
        ) : (
          <NoData
            title={t('chain-item.map.no-data.title')}
            content={t('chain-item.map.no-data.content')}
          />
        )}
      </div>
    </div>
  );
};
