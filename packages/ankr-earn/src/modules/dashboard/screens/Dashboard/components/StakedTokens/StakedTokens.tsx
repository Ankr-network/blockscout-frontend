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
import { EPolygonPoolEventsMap } from 'modules/stake-polygon/api/PolygonSDK';
import { UNSTAKE_TIME_WAIT_HOURS } from 'modules/stake-polygon/const';
import { useMaticStakingAsset } from './useMaticStakingAsset';
import { useMaticTxHistory } from './useMaticTxHistory';
import { useTokensListStyles } from './useTokensListStyles';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  addHours,
} from 'date-fns';
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

  const aMATICbpendingUnstake = MATICTxHistory?.txHistory?.pending.filter(
    transaction =>
      transaction?.txType === EPolygonPoolEventsMap.MaticClaimPending,
  );

  const aMATICbpendingUnstakeDisplay: IPendingTableRow[] = aMATICbpendingUnstake
    ? aMATICbpendingUnstake.map((transaction, index): IPendingTableRow => {
        let daysRemaining = 0;
        let hoursRemaining = 0;
        let minutesRemainig = 0;

        if (transaction) {
          const unstakeDate = addHours(
            new Date(transaction.txDate),
            UNSTAKE_TIME_WAIT_HOURS,
          );

          daysRemaining = differenceInDays(unstakeDate, Date.now());
          hoursRemaining = differenceInHours(unstakeDate, Date.now()) % 24;
          minutesRemainig = differenceInMinutes(unstakeDate, Date.now()) % 60;
        }

        return {
          id: index + 1,
          amount: transaction ? transaction.txAmount.toFormat() : '0',
          timerSlot: t('dashboard.unstake-time', {
            days: daysRemaining,
            hours: hoursRemaining,
            minutes: minutesRemainig,
          }),
        };
      })
    : [];

  return (
    <>
      <Typography className={classes.title} variant="h3">
        {t('dashboard.assets')}
      </Typography>

      {isLoading ? (
        <AssetsList>
          {[...Array(SKELETONS_COUNT)].map((_, index) => (
            <StakingAsset
              openHistoryDialog={handleHistoryDialogOpen}
              isLoading
              key={index}
            />
          ))}
        </AssetsList>
      ) : (
        <AssetsList noChildrenSlot={<NoAssets />}>
          {showAMAITCb && (
            <StakingAsset
              openHistoryDialog={handleHistoryDialogOpen}
              pendingSlot={
                !!aMATICbPendingValue && (
                  <Pending
                    value={aMATICbPendingValue.toString()}
                    token={aMATICbData.token}
                    tooltip={
                      featuresConfig.unstakingHistory && (
                        <PendingTable data={aMATICbpendingUnstakeDisplay} />
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
