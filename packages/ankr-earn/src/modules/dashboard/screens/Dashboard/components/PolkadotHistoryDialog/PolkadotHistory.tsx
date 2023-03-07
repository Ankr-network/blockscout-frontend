import { t } from '@ankr.com/common';

import { Token } from 'modules/common/types/token';
import {
  History,
  HistoryTable,
  HistoryTypeButtons,
} from 'modules/dashboard/components/History';
import { IHistoryTableRow } from 'modules/dashboard/types';
import { TPolkadotToken } from 'modules/stake-polkadot/types';
import { getPolkadotNetworkByToken } from 'modules/stake-polkadot/utils/getPolkadotNetworkByToken';

import { useHistoryTypeButtons } from '../../hooks/useHistoryTypeButtons';

import { usePolkadotHistory } from './usePolkadotHistory';
import { usePolkadotHistoryStyles } from './usePolkadotHistoryStyles';

interface IPolkadotHistoryProps {
  token?: TPolkadotToken;
}

export const PolkadotHistory = ({
  token = Token.DOT,
}: IPolkadotHistoryProps): JSX.Element => {
  const classes = usePolkadotHistoryStyles();
  const network = getPolkadotNetworkByToken(token);

  const { isStakedActive, isUnstakedActive, onStakedClick, onUnstakedClick } =
    useHistoryTypeButtons();

  const { isHistoryDataLoading, stakedHistory, unstakedHistory } =
    usePolkadotHistory(network);

  const tableData: IHistoryTableRow[] = isStakedActive
    ? stakedHistory
    : unstakedHistory;

  const isFirstLoading = isHistoryDataLoading && !tableData.length;

  return (
    <History
      isFirstLoading={isFirstLoading}
      tableSlot={
        isUnstakedActive ? (
          <div className={classes.empty}>
            {t('stake-polkadot.unsupported-unstake-history', { network })}
          </div>
        ) : (
          <HistoryTable data={tableData} token={token} />
        )
      }
      typeButtonsSlot={
        <HistoryTypeButtons
          isStakedActive={isStakedActive}
          isUnstakedActive={isUnstakedActive}
          onStakedClick={onStakedClick}
          onUnstakedClick={onUnstakedClick}
        />
      }
    />
  );
};
