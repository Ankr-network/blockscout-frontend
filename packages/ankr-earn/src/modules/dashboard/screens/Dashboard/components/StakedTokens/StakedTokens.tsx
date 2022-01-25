import { Typography } from '@material-ui/core';
import { featuresConfig } from 'modules/common/const';
import { AssetsList } from 'modules/dashboard/components/AssetsList';
import { NoAssets } from 'modules/dashboard/components/NoAssets';
import { Pending } from 'modules/dashboard/components/Pending';
import { PendingTable } from 'modules/dashboard/components/PendingTable';
import { StakingAsset } from 'modules/dashboard/components/StakingAsset';
import { t } from 'modules/i18n/utils/intl';
import { useMaticStakingAsset } from './useMaticStakingAsset';
import { useMaticTxHistory } from './useMaticTxHistory';
import { useTokensListStyles } from './useTokensListStyles';
import {
  HistoryDialog,
  HistoryDialogData,
} from 'modules/common/components/HistoryDialog';
import { useState } from 'react';

const SKELETONS_COUNT = 1;

export const StakedTokens = () => {
  const aMATICbData = useMaticStakingAsset();
  const MATICTxHistory = useMaticTxHistory();
  const classes = useTokensListStyles();

  const [historyDialogOpened, setHistoryDialogOpened] = useState(false);
  const [historyDialogData, setHistoryDialogData] = useState<HistoryDialogData>(
    {
      token: undefined,
      staked: [],
      unstaked: [],
    },
  );

  const handleHistoryDialogClose = () => setHistoryDialogOpened(false);
  const handleHistoryDialogOpen = (dialogData: HistoryDialogData) => {
    setHistoryDialogData(dialogData);
    setHistoryDialogOpened(true);
  };

  const showAMAITCb = !aMATICbData.amount.isZero() || aMATICbData.isLoading;
  const isLoading = aMATICbData.isLoading;

  const aMATICbPendingValue = aMATICbData.pendingValue
    ? +aMATICbData.pendingValue
    : 0;

  const handleHistoryDialogOpenPolygon = () =>
    handleHistoryDialogOpen(MATICTxHistory.transactionHistory);

  return (
    <>
      <Typography className={classes.title} variant="h3">
        {t('dashboard.assets')}
      </Typography>

      {isLoading ? (
        <AssetsList>
          {[...Array(SKELETONS_COUNT)].map((_, index) => (
            <StakingAsset
              openHistoryDialog={handleHistoryDialogOpenPolygon}
              isLoading
              key={index}
            />
          ))}
        </AssetsList>
      ) : (
        <AssetsList noChildrenSlot={<NoAssets />}>
          {showAMAITCb && (
            <StakingAsset
              openHistoryDialog={handleHistoryDialogOpenPolygon}
              pendingSlot={
                !!aMATICbPendingValue && (
                  <Pending
                    value={aMATICbPendingValue.toString()}
                    token={aMATICbData.token}
                    tooltip={
                      featuresConfig.unstakingHistory && (
                        <PendingTable
                          data={MATICTxHistory.pendingUnstakeHistory}
                        />
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

      <HistoryDialog
        open={historyDialogOpened}
        onClose={handleHistoryDialogClose}
        history={historyDialogData}
      />
    </>
  );
};
