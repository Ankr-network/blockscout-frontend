import { SecondaryTab, TabSize } from 'modules/common/components/SecondaryTab';
import {
  EVMLibrary,
  EVMLibraryID,
  EVMMethod,
} from 'domains/requestComposer/constants';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';

import { EVMSampleCode } from './EVMSampleCode';

interface UseMethodsTabsUtilsArguments {
  group: EndpointGroup;
  title: EVMMethod;
  args: string[];
  libraryID: EVMLibraryID;
}

export const useMethodsTabsUtils = ({
  group,
  title,
  args,
  libraryID,
}: UseMethodsTabsUtilsArguments) => {
  const rawTabs: Tab<EVMLibraryID>[] = useLocaleMemo(
    () => [
      {
        id: EVMLibraryID.WEB3,
        content: (
          <EVMSampleCode
            group={group}
            title={title}
            args={args}
            libraryID={EVMLibraryID.WEB3}
          />
        ),
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={EVMLibrary[EVMLibraryID.WEB3]}
            size={TabSize.Small}
          />
        ),
      },
      {
        id: EVMLibraryID.ETHERS,
        content: (
          <EVMSampleCode
            group={group}
            title={title}
            args={args}
            libraryID={EVMLibraryID.ETHERS}
          />
        ),
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={EVMLibrary[EVMLibraryID.ETHERS]}
            size={TabSize.Small}
          />
        ),
      },
      {
        id: EVMLibraryID.JSON_RPC,
        content: (
          <EVMSampleCode
            group={group}
            title={title}
            args={args}
            libraryID={EVMLibraryID.JSON_RPC}
          />
        ),
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={EVMLibrary[EVMLibraryID.JSON_RPC]}
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
