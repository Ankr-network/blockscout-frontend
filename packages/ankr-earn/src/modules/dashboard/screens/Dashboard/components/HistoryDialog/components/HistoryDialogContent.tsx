import { t } from '@ankr.com/common';
import { useCallback } from 'react';

import { Token } from 'modules/common/types/token';
import {
  History,
  HistoryFooter,
  HistorySelect,
  HistoryTypeButtons,
} from 'modules/dashboard/components/History';
import { useHistoryTokenSelect } from 'modules/dashboard/screens/Dashboard/components/HistoryDialog/hooks/useHistoryTokenSelect';
import { useTokenSelectOptions } from 'modules/dashboard/screens/Dashboard/components/HistoryDialog/hooks/useTokenSelectOptions';
import { getIsFullHistoryAvailable } from 'modules/dashboard/screens/Dashboard/components/HistoryDialog/utils/getIsFullHistoryAvailable';
import { HISTORY_STEP_WEEKS } from 'modules/dashboard/screens/Dashboard/const';
import { useHistoryTypeButtons } from 'modules/dashboard/screens/Dashboard/hooks/useHistoryTypeButtons';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import { useHistory } from '../hooks/useHistory';

import { AvaxHistoryTable } from './AvaxHistoryTable';
import { BnbHistoryTable } from './BnbHistoryTable';
import { EthHistoryTable } from './EthHistoryTable';
import { FtmHistoryTable } from './FtmHistoryTable';
import { MaticOnEthHistoryTable } from './MaticOnEthHistoryTable';
import { XdcHistoryTable } from './XdcHistoryTable';

interface IHistoryDialogContentProps {
  defaultSelectedToken: Token;
}

export const HistoryDialogContent = ({
  defaultSelectedToken,
}: IHistoryDialogContentProps): JSX.Element => {
  const selectOptions = useTokenSelectOptions();

  const { selectedToken, onTokenSelectChange } =
    useHistoryTokenSelect(defaultSelectedToken);

  const { isStakedActive, isUnstakedActive, onStakedClick, onUnstakedClick } =
    useHistoryTypeButtons();

  const {
    stakeEvents,
    unstakeEvents,
    loading: isLoading,
    weeksAmount,
    handleShowMore,
  } = useHistory({
    token: selectedToken,
  });

  const isNotDefaultHisoryRange = weeksAmount > HISTORY_STEP_WEEKS;

  const isFirstLoading =
    isLoading && !stakeEvents.length && !unstakeEvents.length;

  const isFullHistory = getIsFullHistoryAvailable(selectedToken);

  const footerText = useLocaleMemo(() => {
    if (isLoading) {
      return t('history-dialog.loading-date-range');
    }

    if (isNotDefaultHisoryRange) {
      return t('history-dialog.date-range', { value: weeksAmount });
    }

    return t('history-dialog.default-date-range');
  }, [isLoading, weeksAmount]);

  const renderTableSlot = useCallback(() => {
    const commonProps = {
      isUnstakedActive,
      stakeHistory: stakeEvents,
      token: selectedToken,
      unstakeHistory: unstakeEvents,
    };

    switch (selectedToken) {
      case Token.aAVAXc:
      case Token.aAVAXb:
        return <AvaxHistoryTable {...commonProps} />;

      case Token.aBNBb:
      case Token.aBNBc:
        return <BnbHistoryTable {...commonProps} />;

      case Token.aETHb:
      case Token.aETHc:
        return <EthHistoryTable {...commonProps} />;

      case Token.aFTMb:
      case Token.aFTMc:
        return <FtmHistoryTable {...commonProps} />;

      case Token.aMATICb:
      case Token.aMATICc:
        return <MaticOnEthHistoryTable {...commonProps} />;

      case Token.ankrXDC:
        return <XdcHistoryTable {...commonProps} />;

      default:
        return undefined;
    }
  }, [isUnstakedActive, selectedToken, stakeEvents, unstakeEvents]);

  return (
    <History
      footerSlot={
        !isFullHistory ? (
          <HistoryFooter
            footerText={footerText}
            isLoading={isLoading}
            onShowMoreClick={handleShowMore}
          />
        ) : undefined
      }
      isFirstLoading={isFirstLoading}
      tableSlot={renderTableSlot()}
      tokenSelectSlot={
        <HistorySelect
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
