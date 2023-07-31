import { ReactNode, useMemo } from 'react';

import { DEFAULT_ANKR_VALUE_STRING } from 'domains/account/actions/topUp/const';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { TrackTopUpSubmit } from 'domains/account/types';

import { USDTopUpForm } from './USDTopUpForm';
import {
  AmountInputField,
  TopUpFormValues,
} from './ANKRTopUpForm/ANKRTopUpFormTypes';

export interface TopUpTabsParams {
  ankrTopupTab?: Tab<TopUpTabID>;
  icon?: ReactNode;
  initialTabId?: TopUpTabID;
  tabClassName: string;
  trackSubmit: TrackTopUpSubmit;
  usdPriceId?: string;
}

export const useInitialValues = (
  shouldUseDefaultValue = false,
): TopUpFormValues => {
  return useMemo(
    () => ({
      [AmountInputField.amount]: shouldUseDefaultValue
        ? DEFAULT_ANKR_VALUE_STRING
        : '',
    }),
    [shouldUseDefaultValue],
  );
};

export enum TopUpTabID {
  ANKR = 'ANKR',
  USD = 'USD',
}

export const useTopUpTabs = ({
  ankrTopupTab,
  icon,
  initialTabId,
  tabClassName,
  trackSubmit,
  usdPriceId,
}: TopUpTabsParams) => {
  const defaultTabId = ankrTopupTab ? TopUpTabID.ANKR : TopUpTabID.USD;
  const initialTabID = initialTabId ?? defaultTabId;

  const rawTabs: Tab<TopUpTabID>[] = useMemo(() => {
    const tabs = [
      {
        id: TopUpTabID.USD,
        content: (
          <USDTopUpForm trackSubmit={trackSubmit} usdPriceId={usdPriceId} />
        ),
        title: (isSelected: boolean) => (
          <SecondaryTab
            className={tabClassName}
            isSelected={isSelected}
            label={TopUpTabID.USD}
            startIcon={icon}
          />
        ),
      },
    ];

    if (ankrTopupTab) {
      return [ankrTopupTab, ...tabs];
    }

    return tabs;
  }, [ankrTopupTab, trackSubmit, icon, tabClassName, usdPriceId]);

  return useTabs({
    initialTabID,
    tabs: rawTabs,
  });
};
