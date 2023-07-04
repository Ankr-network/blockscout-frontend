import { ReactNode, useMemo } from 'react';

import { DEFAULT_ANKR_VALUE_STRING } from 'domains/account/actions/topUp/const';
import {
  AmountInputField,
  TopUpFormValues,
} from './ANKRTopUpForm/ANKRTopUpFormTypes';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { USDTopUpForm } from './USDTopUpForm';
import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { TrackTopUpSubmit } from 'domains/account/types';

export interface TopUpTabsParams {
  ankrTopupTab?: Tab<TopUpTabID>;
  icon?: ReactNode;
  tabClassName: string;
  trackSubmit: TrackTopUpSubmit;
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
  trackSubmit,
  tabClassName,
}: TopUpTabsParams) => {
  const initialTabID = ankrTopupTab ? TopUpTabID.ANKR : TopUpTabID.USD;

  const rawTabs: Tab<TopUpTabID>[] = useMemo(() => {
    const tabs = [
      {
        id: TopUpTabID.USD,
        content: <USDTopUpForm trackSubmit={trackSubmit} />,
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
  }, [ankrTopupTab, trackSubmit, icon, tabClassName]);

  return useTabs({
    initialTabID,
    tabs: rawTabs,
  });
};
