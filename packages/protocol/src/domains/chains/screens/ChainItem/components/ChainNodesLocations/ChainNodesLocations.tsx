import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ChainNodesLocationsProps } from './ChainNodesTableProps';
import { useChainNodesLocationsStyles } from './useChainNodesLocationsStyles';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { UpgradeInfo } from './components/UpgradeInfo';
import { LocationsTableContainer } from './components/LocationsTable/LocationsTableContainer';

export const ChainNodesLocations = ({
  loading,
  nodesDetail,
}: ChainNodesLocationsProps) => {
  const { classes, cx } = useChainNodesLocationsStyles();
  const { hasPremium } = useAuth();

  return (
    <div className={classes.root}>
      <div className={classes.head}>
        <Typography variant="subtitle1" className={classes.title}>
          {t('chain-item.locations.header')}
        </Typography>
        <div className={classes.indicate}>
          <div className={classes.item}>
            <div className={cx(classes.dot, classes.freeDot)} />
            {t('chain-item.locations.head.free')}
          </div>
          <div className={classes.item}>
            <div className={cx(classes.dot, classes.premiumDot)} />
            {t('chain-item.locations.head.premium')}
          </div>
        </div>
      </div>
      <div className={classes.container}>
        <LocationsTableContainer loading={loading} nodesDetail={nodesDetail} />
      </div>
      {!hasPremium && <UpgradeInfo />}
    </div>
  );
};
