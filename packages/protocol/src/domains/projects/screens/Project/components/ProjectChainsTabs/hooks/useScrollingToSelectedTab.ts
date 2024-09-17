import { useEffect, useRef } from 'react';
import { ChainID } from '@ankr.com/chains-list';

import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useOnScreen } from 'modules/common/hooks/useOnScreen';

export const useScrollingToSelectedTab = (selectedTabId?: ChainID) => {
  const isSelectedElementVisible = useOnScreen(
    selectedTabId ? document.getElementById(selectedTabId) : undefined,
  );

  const lastSelectedTabId = useRef(selectedTabId);

  useOnMount(() => {
    const newTabElement =
      selectedTabId && document.getElementById(selectedTabId);

    if (newTabElement) {
      newTabElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  });

  useEffect(() => {
    const newTabElement =
      selectedTabId && document.getElementById(selectedTabId);

    const isTabChanged = lastSelectedTabId.current !== selectedTabId;

    const shouldScroll =
      !isSelectedElementVisible &&
      selectedTabId &&
      newTabElement &&
      isTabChanged;

    if (shouldScroll) {
      newTabElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });

      lastSelectedTabId.current = selectedTabId;
    }
    // we don't want to scroll when the isSelectedElementVisible is changed, so it is removed from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTabId]);
};
