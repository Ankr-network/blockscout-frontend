import { t } from '@ankr.com/common';

import { Token } from 'modules/common/types/token';
import {
  History,
  HistoryFooter,
  HistorySelect,
  HistoryTable,
  HistoryTypeButtons,
} from 'modules/dashboard/components/History';
import { useHistory } from 'modules/dashboard/screens/Dashboard/hooks/useHistory';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import { HISTORY_STEP_WEEKS } from '../../const';
import { useTokenSelectOptions } from '../../hooks/liquid-tokens/useTokenSelectOptions';
import { useHistoryTypeButtons } from '../../hooks/useHistoryTypeButtons';

import { useHistoryTokenSelect } from './useHistoryTokenSelect';
import { getNetworkByToken } from './utils/getNetworkByToken';

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

  const selectOptions = useTokenSelectOptions();

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

  const isNotDefaultHisoryRange = weeksAmount > HISTORY_STEP_WEEKS;

  const footerText = useLocaleMemo(() => {
    if (isLoading) {
      return t('history-dialog.loading-date-range');
    }

    if (isNotDefaultHisoryRange) {
      return t('history-dialog.date-range', { value: weeksAmount });
    }

    return t('history-dialog.default-date-range');
  }, [isLoading, weeksAmount]);

  return (
    <History
      footerSlot={
        <HistoryFooter
          footerText={footerText}
          isLoading={isLoading}
          onShowMoreClick={handleShowMore}
        />
      }
      isFirstLoading={isFirstLoading}
      tableSlot={<HistoryTable data={tableData} token={selectedToken} />}
      tokenSelectSlot={
        <HistorySelect
          isDisabled={isLoading}
          options={selectOptions}
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
    />
  );
};
