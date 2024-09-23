import { SecondaryTabs } from 'modules/common/components/SecondaryTabs';
import { Tab } from 'modules/common/hooks/useTabs';

import { useChainViewSelectorStyles } from './useChainViewSelectorStyles';
import { EChainView } from './useChainViewSelector';

interface IChainViewSelectorProps {
  chainsViewTabs: Tab<EChainView>[];
  selectedChainsViewTab: Tab<EChainView>;
  className?: string;
}

export const ChainViewSelector = ({
  chainsViewTabs,
  className,
  selectedChainsViewTab,
}: IChainViewSelectorProps) => {
  const { classes, cx } = useChainViewSelectorStyles();

  return (
    <SecondaryTabs
      className={cx(classes.chainsViewSelector, className)}
      selectedTab={selectedChainsViewTab}
      tabs={chainsViewTabs}
      visible
    />
  );
};
