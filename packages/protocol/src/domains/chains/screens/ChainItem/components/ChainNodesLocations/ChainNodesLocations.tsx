import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ChainNodesLocationsProps } from './ChainNodesTableProps';
import { useChainNodesLocationsStyles } from './useChainNodesLocationsStyles';
import { LocationsTable } from './components/LocationsTable';
import { LocationsMap } from './components/LocationsMap';

export const ChainNodesLocations = ({
  loading,
  nodesDetail,
}: ChainNodesLocationsProps) => {
  const { classes } = useChainNodesLocationsStyles();

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" className={classes.title}>
        {t('chain-item.locations.header')}
      </Typography>
      <div className={classes.container}>
        <div className={classes.table}>
          <LocationsTable loading={loading} nodesDetail={nodesDetail} />
        </div>
        <div className={classes.mapContainer}>
          <LocationsMap nodesDetail={nodesDetail} />
        </div>
      </div>
    </div>
  );
};
