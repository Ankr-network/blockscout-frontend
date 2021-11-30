import React, { useMemo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
} from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './useStyles';
import {
  GEO_URL,
  getMarkerPointsAndStats,
  getGeogrpahyStyles,
} from './RequestsMapUtils';
import { RequestsMapProps } from './RequestsMapTypes';

export const RequestsMap = ({ countries }: RequestsMapProps) => {
  const classes = useStyles();

  const data = useMemo(() => getMarkerPointsAndStats(countries), [countries]);

  return (
    <div className={classes.root}>
      <Typography variant="h5">{t('chain-item.map.header')}</Typography>
      <div className={classes.container}>
        <div className={classes.stats}>
          <TableContainer
            component={Paper}
            className={classes.table}
            elevation={0}
          >
            <Box component={Table} minWidth={230}>
              <TableBody>
                {data.map(country => {
                  const { color, name, requests } = country;

                  return (
                    <TableRow key={name} className={classes.row}>
                      <TableCell padding="none" className={classes.firstCell}>
                        <div
                          className={classes.dot}
                          style={{ backgroundColor: color }}
                        />
                        <Typography variant="subtitle1">{name}</Typography>
                      </TableCell>

                      <TableCell padding="none" className={classes.secondCell}>
                        <Typography
                          variant="subtitle1"
                          className={classes.requests}
                        >
                          {requests}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Box>
          </TableContainer>
        </div>
        <div className={classes.mapContainer}>
          <ComposableMap height={470}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) => {
                return geographies
                  .filter(d => d.properties.ISO_A2 !== 'AQ')
                  .map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={getGeogrpahyStyles(geo, data)}
                    />
                  ));
              }}
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
};
