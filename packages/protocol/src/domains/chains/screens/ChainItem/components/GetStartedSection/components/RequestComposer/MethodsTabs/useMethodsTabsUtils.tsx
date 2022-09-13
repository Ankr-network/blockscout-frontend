import {
  SecondaryTab,
  TabSize,
} from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import {
  EVMMethod,
  Library,
  LibraryID,
} from 'domains/requestComposer/constants';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { SampleCode } from '../SampleCode';

export const useMethodsTabsUtils = (
  group: EndpointGroup,
  title: EVMMethod,
  args: string[],
  libraryID: LibraryID,
) => {
  const rawTabs: Tab<LibraryID>[] = useLocaleMemo(
    () => [
      {
        id: LibraryID.WEB3,
        content: (
          <SampleCode
            group={group}
            title={title}
            args={args}
            libraryID={LibraryID.WEB3}
          />
        ),
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={Library[LibraryID.WEB3]}
            size={TabSize.Small}
            isDarkTheme
          />
        ),
      },
      {
        id: LibraryID.ETHERS,
        content: (
          <SampleCode
            group={group}
            title={title}
            args={args}
            libraryID={LibraryID.ETHERS}
          />
        ),
        title: (isSelected: boolean) => (
          <SecondaryTab
            isSelected={isSelected}
            label={Library[LibraryID.ETHERS]}
            size={TabSize.Small}
            isDarkTheme
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
