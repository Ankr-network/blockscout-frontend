import React, { useMemo, useState } from 'react';
import { Typography } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './useStyles';
import { getMarkerPointsAndStats } from './RequestsMapUtils';
import { RequestsMapProps } from './RequestsMapTypes';
import { StatsTable } from './StatsTable';
import { StatsMap } from './StatsMap';

export const RequestsMap = ({
  countries,
  userCountryCode = '',
}: RequestsMapProps) => {
  const classes = useStyles();
  const [country, setCountry] = useState<string>('');

  const data = useMemo(() => getMarkerPointsAndStats(countries), [countries]);

  return (
    <div className={classes.root}>
      <Typography variant="h5">{t('chain-item.map.header')}</Typography>
      <div className={classes.container}>
        <StatsTable
          data={data}
          selectedCountry={country}
          userCountryCode={userCountryCode}
        />
        <div className={classes.mapContainer}>
          <StatsMap data={data} setCountry={setCountry} />
        </div>
      </div>
    </div>
  );
};
