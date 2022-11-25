import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { TopUpForm } from '../TopUpForm';
import { USDTopUpForm } from '../USDTopUpForm';

export enum TopUpTabID {
  ANKR = 'ANKR',
  USD = 'USD',
}

export const useTopUpTabs = (canPayOnlyByCard: boolean) => {
  const initialTabID = canPayOnlyByCard ? TopUpTabID.USD : TopUpTabID.ANKR;

  const rawTabs: Tab<TopUpTabID>[] = useLocaleMemo(() => {
    const tabs = [
      {
        id: TopUpTabID.USD,
        content: <USDTopUpForm />,
        title: (isSelected: boolean) => (
          <SecondaryTab isSelected={isSelected} label={TopUpTabID.USD} />
        ),
      },
    ];

    if (!canPayOnlyByCard) {
      return [
        {
          id: TopUpTabID.ANKR,
          content: <TopUpForm />,
          title: (isSelected: boolean) => (
            <SecondaryTab isSelected={isSelected} label={TopUpTabID.ANKR} />
          ),
        },
        ...tabs,
      ];
    }

    return tabs;
  }, []);

  return useTabs({
    initialTabID,
    tabs: rawTabs,
  });
};
