import { t } from 'common';
import {
  SecondaryTab,
  TabSize,
} from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { useTabs } from 'modules/common/hooks/useTabs';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { Tab } from 'uiKit/TabsManager';

const intlRoot = 'chain-item.request-composer.method-description.harmony';

export enum HarmonyApiVersionPrefix {
  v1 = 'hmy_',
  v2 = 'hmyv2_',
}

export const useVersionTabs = () => {
  const rawTabs: Tab<HarmonyApiVersionPrefix>[] = useLocaleMemo(() => [
    {
      id: HarmonyApiVersionPrefix.v1,
      title: (isSelected: boolean) => (
        <SecondaryTab
          isSelected={isSelected}
          label={t(`${intlRoot}.api-v1`)}
          size={TabSize.Small}
          isDarkTheme
        />
      ),
    },
    {
      id: HarmonyApiVersionPrefix.v2,
      title: (isSelected: boolean) => (
        <SecondaryTab
          isSelected={isSelected}
          label={t(`${intlRoot}.api-v2`)}
          size={TabSize.Small}
          isDarkTheme
        />
      ),
    },
  ]);

  return useTabs({
    initialTabID: HarmonyApiVersionPrefix.v1,
    tabs: rawTabs,
  });
};
