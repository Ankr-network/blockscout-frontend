import { useMemo, useState } from 'react';
import { t } from '@ankr.com/common';
import { OverlaySpinner } from '@ankr.com/ui';
import { Timeframe } from '@ankr.com/chains-list';

import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { RequestsMapProps } from './RequestsMapTypes';
import { getMarkerPointsAndStats } from './RequestsMapUtils';
import { StatsMap } from './StatsMap';
import { StatsTable } from './StatsTable';
import { ItemHeader } from '../ItemHeader';
import { useRequestsMapStyles } from './useRequestsMapStyles';

export const RequestsMap = ({
  countries,
  isTitleHidden,
  loading,
  timeframe,
}: RequestsMapProps) => {
  const { classes } = useRequestsMapStyles();
  const [country, setCountry] = useState<string>('');
  const { isLightTheme } = useThemes();

  const data = useMemo(
    () => getMarkerPointsAndStats(countries, isLightTheme),
    [countries, isLightTheme],
  );

  const isUnsupportedTimeframe =
    timeframe === Timeframe.Hour || timeframe === Timeframe.Day;

  return (
    <div className={classes.root}>
      {!isTitleHidden && (
        <ItemHeader timeframe={timeframe} title={t('chain-item.map.header')} />
      )}
      {loading ? (
        <div className={classes.loading}>
          <OverlaySpinner />
        </div>
      ) : (
        <div className={classes.container}>
          <StatsTable
            data={data}
            selectedCountry={country}
            isUnsupportedTimeframe={isUnsupportedTimeframe}
          />
          <div className={classes.mapContainer}>
            <StatsMap data={data} setCountry={setCountry} />
          </div>
        </div>
      )}
    </div>
  );
};
