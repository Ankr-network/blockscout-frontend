import { useMemo, useState } from 'react';
import { t } from '@ankr.com/common';
import { OverlaySpinner } from '@ankr.com/ui';

import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { NoData } from '../MethodCalls/components/NoData';
import { RequestsMapProps } from './RequestsMapTypes';
import { getMarkerPointsAndStats } from './RequestsMapUtils';
import { StatsMap } from './StatsMap';
import { StatsTable } from './StatsTable';
import { ItemHeader } from '../ItemHeader';
import { useRequestsMapStyles } from './useRequestsMapStyles';
import { useIsRequestsMapVisible } from '../UsageDataSection/UsageDataSectionUtils';

export const RequestsMap = ({
  loading,
  countries,
  timeframe,
}: RequestsMapProps) => {
  const { classes } = useRequestsMapStyles();
  const [country, setCountry] = useState<string>('');
  const { isLightTheme } = useThemes();

  const data = useMemo(
    () => getMarkerPointsAndStats(countries, isLightTheme),
    [countries, isLightTheme],
  );

  const isRequestsMapVisible = useIsRequestsMapVisible(countries);

  return (
    <div className={classes.root}>
      <ItemHeader timeframe={timeframe} title={t('chain-item.map.header')} />
      {loading ? (
        <div className={classes.loading}>
          <OverlaySpinner />
        </div>
      ) : (
        <div className={classes.container}>
          {isRequestsMapVisible ? (
            <>
              <StatsTable data={data} selectedCountry={country} />
              <div className={classes.mapContainer}>
                <StatsMap data={data} setCountry={setCountry} />
              </div>
            </>
          ) : (
            <div className={classes.noData}>
              <NoData />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
