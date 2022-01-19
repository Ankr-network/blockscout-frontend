import { Typography } from '@material-ui/core';
import { featuresConfig } from 'modules/common/const';
import { AssetsList } from 'modules/dashboard/components/AssetsList';
import { NoAssets } from 'modules/dashboard/components/NoAssets';
import { Pending } from 'modules/dashboard/components/Pending';
import {
  IPendingTableRow,
  PendingTable,
} from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { useMaticStakingAsset } from './useMaticStakingAsset';
import { useTokensListStyles } from './useTokensListStyles';

const SKELETONS_COUNT = 1;

const rowsDemo: IPendingTableRow[] = [
  {
    id: 1,
    amount: '10 aMATICb',
    timerSlot: '1d 3h 23m',
  },
  {
    id: 2,
    amount: '10 aMATICb',
    timerSlot: '1d 3h 23m',
  },
];

export const StakedTokens = () => {
  const aMATICbData = useMaticStakingAsset();
  const classes = useTokensListStyles();

  const showAMAITCb = !aMATICbData.amount.isZero() || aMATICbData.isLoading;
  const isLoading = aMATICbData.isLoading;

  return (
    <>
      <Typography className={classes.title} variant="h3">
        {t('dashboard.assets')}
      </Typography>

      {isLoading ? (
        <AssetsList>
          {[...Array(SKELETONS_COUNT)].map((_, index) => (
            <StakingAsset isLoading key={index} />
          ))}
        </AssetsList>
      ) : (
        <AssetsList noChildrenSlot={<NoAssets />}>
          {showAMAITCb && (
            <StakingAsset
              pendingSlot={
                !!aMATICbData.pendingValue && (
                  <Pending
                    value={aMATICbData.pendingValue}
                    token={aMATICbData.token}
                    tooltip={
                      featuresConfig.unstakingHistory && (
                        <PendingTable data={rowsDemo} />
                      )
                    }
                  />
                )
              }
              network={aMATICbData.network}
              token={aMATICbData.token}
              amount={aMATICbData.amount}
              tradeLink={aMATICbData.tradeLink}
              unstakeLink={aMATICbData.unstakeLink}
              stakeLink={aMATICbData.stakeLink}
              isStakeLoading={aMATICbData.isStakeLoading}
            />
          )}
        </AssetsList>
      )}
    </>
  );
};
