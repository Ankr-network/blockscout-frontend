import { SecondaryTab, TabSize } from 'modules/common/components/SecondaryTab';
import {
  NearLibrary,
  NearLibraryID,
  NearMethod,
} from 'domains/requestComposer/constants/near';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';

import { NearSampleCode } from './NearSampleCode';

interface UseMethodsTabsUtilsArguments {
  group: EndpointGroup;
  title: NearMethod;
  args: string[];
  libraryID: NearLibraryID;
}

export const useMethodsTabsUtils = ({
  args,
  group,
  libraryID,
  title,
}: UseMethodsTabsUtilsArguments) => {
  const rawTabs: Tab<NearLibraryID>[] = useLocaleMemo(
    () => [
      {
        id: NearLibraryID.NEARJavaScriptAPI,
        content: (
          <NearSampleCode
            group={group}
            title={title}
            args={args}
            libraryID={NearLibraryID.NEARJavaScriptAPI}
          />
        ),
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={NearLibrary[NearLibraryID.NEARJavaScriptAPI]}
            size={TabSize.Small}
          />
        ),
      },
    ],
    [],
  );

  return useTabs({
    initialTabID: libraryID,
    tabs: rawTabs,
  });
};
