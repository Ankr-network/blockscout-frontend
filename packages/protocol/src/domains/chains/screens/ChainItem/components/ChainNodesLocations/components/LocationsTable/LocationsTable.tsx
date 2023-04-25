import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';

import { LocationsTableProps } from './LocationsTableProps';
import { useLocationsTableStyles } from './useLocationsTableStyles';

export const LocationsTable = ({ nodesRows }: LocationsTableProps) => {
  const { classes } = useLocationsTableStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        {t('chain-item.locations.head.location')}
      </Typography>
      {nodesRows.map(item => (
        <div className={classes.row} key={item.continent}>
          <Typography className={classes.continent} variant="body2">
            {item.continent}
          </Typography>
          <div className={classes.indicate}>
            {!item.isPremium && (
              <div
                className={classes.free}
                style={{ width: `${item.freePercent}` }}
              />
            )}
            <div className={classes.premiumItem}>
              <div
                className={classes.premium}
                style={{ width: `${item.premiumPercent}` }}
              />
              {!item.isPremium && (
                <Typography className={classes.count}>
                  {t('chain-item.locations.head.count')}
                </Typography>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
