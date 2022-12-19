import { useMemo } from 'react';

import { DEFAULT_ANKR_VALUE_STRING } from 'domains/account/actions/topUp/const';
import {
  AmountInputField,
  TopUpFormValues,
} from './ANKRTopUpForm/ANKRTopUpFormTypes';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { USDTopUpForm } from './USDTopUpForm';
import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';

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

export const useTopUpTabs = (ankrTopupTab?: Tab<TopUpTabID>) => {
  const initialTabID = ankrTopupTab ? TopUpTabID.ANKR : TopUpTabID.USD;

  const rawTabs: Tab<TopUpTabID>[] = useMemo(() => {
    const tabs = [
      {
        id: TopUpTabID.USD,
        content: <USDTopUpForm />,
        title: (isSelected: boolean) => (
          <SecondaryTab isSelected={isSelected} label={TopUpTabID.USD} />
        ),
      },
    ];

    if (ankrTopupTab) {
      return [ankrTopupTab, ...tabs];
    }

    return tabs;
  }, [ankrTopupTab]);

  return useTabs({
    initialTabID,
    tabs: rawTabs,
  });
};
