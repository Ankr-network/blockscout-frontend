import { useMemo } from 'react';

import { useTabs } from 'modules/common/hooks/useTabs';

import { TopUpFormTabID } from '../constants';
import { getInitialTabId } from '../utils/getInitialTabId';
import { getTabs } from '../utils/getTabs';
import { useSubmitTrackingHandler } from './useSubmitTrackingHandler';

export interface TabsParams {
  handleOpenEmailDialog: () => void;
  hasEmailBound: boolean;
  initialTabId?: TopUpFormTabID;
  usdPaymentOnly: boolean;
  usdPriceId?: string;
}

export const useTopUpTabs = ({
  handleOpenEmailDialog,
  hasEmailBound,
  initialTabId,
  usdPaymentOnly,
  usdPriceId,
}: TabsParams) => {
  const trackSubmit = useSubmitTrackingHandler();

  const hasAnkrTab = !usdPaymentOnly;

  const initialTabID = useMemo(
    () => getInitialTabId({ hasAnkrTab, initialTabId }),
    [hasAnkrTab, initialTabId],
  );

  const tabs = useMemo(
    () =>
      getTabs({
        handleOpenEmailDialog,
        hasAnkrTab,
        hasEmailBound,
        trackSubmit,
        usdPriceId,
      }),
    [handleOpenEmailDialog, hasAnkrTab, hasEmailBound, trackSubmit, usdPriceId],
  );

  return useTabs({ initialTabID, tabs });
};
