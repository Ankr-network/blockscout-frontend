import { useMemo } from 'react';
import { Typography } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useIsXSDown } from 'uiKit/Theme/useTheme';

import { ChainNodesLocationsProps } from '../../ChainNodesTableProps';
import { useChainNodesLocationsStyles } from '../../useChainNodesLocationsStyles';
import { LocationsTable } from './LocationsTable';
import { getRows } from './LocationsTableUtils';

export const LocationsTableContainer = ({
  loading,
  nodesDetail,
  shouldShowRealNodesRatio,
}: ChainNodesLocationsProps) => {
  const { classes } = useChainNodesLocationsStyles();

  const isMobile = useIsXSDown();

  const nodesRows = useMemo(
    () => getRows(nodesDetail, shouldShowRealNodesRatio),
    [shouldShowRealNodesRatio, nodesDetail],
  );

  const rowSize = useMemo(() => Math.ceil(nodesRows.length / 2), [nodesRows]);

  if (loading) {
    return <OverlaySpinner />;
  }

  if (nodesRows.length === 0) {
    return (
      <Typography variant="body2" className={classes.empty}>
        {t('chain-item.locations.empty')}
      </Typography>
    );
  }

  if (isMobile) {
    return (
      <LocationsTable
        shouldShowRealNodesRatio={shouldShowRealNodesRatio}
        nodesRows={nodesRows}
      />
    );
  }

  return (
    <div className={classes.row}>
      <div className={classes.nodes}>
        <LocationsTable
          shouldShowRealNodesRatio={shouldShowRealNodesRatio}
          nodesRows={nodesRows.slice(0, rowSize)}
        />
      </div>
      {nodesRows.length > 1 && (
        <div className={classes.nodes}>
          <LocationsTable
            shouldShowRealNodesRatio={shouldShowRealNodesRatio}
            nodesRows={nodesRows.slice(rowSize)}
          />
        </div>
      )}
    </div>
  );
};
