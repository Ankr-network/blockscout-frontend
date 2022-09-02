import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { TopUpForm } from '../TopUpForm';
import { USDTopUpForm } from '../USDTopUpForm';

export enum TopUpTabID {
  ANKR = 'ANKR',
  USD = 'USD',
}

export const useTopUpTabs = (isEligibleForCardPayment: boolean) => {
  const initialTabID = isEligibleForCardPayment
    ? TopUpTabID.USD
    : TopUpTabID.ANKR;

  const rawTabs: Tab<TopUpTabID>[] = useLocaleMemo(
    () => [
      {
        id: TopUpTabID.ANKR,
        content: <TopUpForm />,
        title: (isSelected: boolean) => (
          <SecondaryTab isSelected={isSelected} label={TopUpTabID.ANKR} />
        ),
      },
      {
        id: TopUpTabID.USD,
        content: <USDTopUpForm />,
        title: (isSelected: boolean) => (
          <SecondaryTab isSelected={isSelected} label={TopUpTabID.USD} />
        ),
        isDisabled: !isEligibleForCardPayment,
      },
    ],
    [],
  );

  return useTabs({
    initialTabID,
    tabs: rawTabs,
  });
};
