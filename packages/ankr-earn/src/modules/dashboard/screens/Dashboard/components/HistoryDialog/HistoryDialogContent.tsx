import { t } from '@ankr.com/common';

import { useHistory } from 'modules/common/components/HistoryDialog/hooks/useHistory';
import { getNetworkByToken } from 'modules/common/components/HistoryDialog/utils/getNetworkByToken';
import { Token } from 'modules/common/types/token';
import {
  History,
  HistorySelect,
  HistoryTable,
  HistoryTypeButtons,
} from 'modules/dashboard/components/History';

import { useHistoryTokenSelect } from './useHistoryTokenSelect';
import { useHistoryTypeButtons } from './useHistoryTypeButtons';

interface IHistoryDialogContentProps {
  defaultSelectedToken: Token;
}

export const HistoryDialogContent = ({
  defaultSelectedToken,
}: IHistoryDialogContentProps): JSX.Element => {
  const { selectedToken, onTokenSelectChange } =
    useHistoryTokenSelect(defaultSelectedToken);

  const { isStakedActive, isUnstakedActive, onStakedClick, onUnstakedClick } =
    useHistoryTypeButtons();

  const networkByToken = getNetworkByToken(selectedToken);

  const {
    stakeEvents,
    unstakeEvents,
    loading: isLoading,
    weeksAmount,
    handleShowMore,
  } = useHistory({
    token: selectedToken,
    open: true,
    network: networkByToken,
  });

  const tableData = isStakedActive ? stakeEvents : unstakeEvents;

  const isFirstLoading = isLoading && !tableData.length;

  const footerText =
    weeksAmount > 2
      ? t('history-dialog.date-range', { value: weeksAmount })
      : undefined;

  return (
    <History
      footerText={footerText}
      isFirstLoading={isFirstLoading}
      isLoading={isLoading}
      tableSlot={<HistoryTable data={tableData} token={selectedToken} />}
      tokenSelectSlot={
        <HistorySelect
          isDisabled={isLoading}
          value={selectedToken}
          onChange={onTokenSelectChange}
        />
      }
      typeButtonsSlot={
        <HistoryTypeButtons
          isStakedActive={isStakedActive}
          isUnstakedActive={isUnstakedActive}
          onStakedClick={onStakedClick}
          onUnstakedClick={onUnstakedClick}
        />
      }
      onShowMoreClick={handleShowMore}
    />
  );
};
