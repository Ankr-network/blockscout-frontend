import { ArrowLeftSmall, ArrowRightSmall } from '@ankr.com/ui';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ChainID } from 'modules/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';

import { ScrollButton } from '../components/ScrollButton';
import { useProjectChainsTabsStyles } from '../useProjectChainsTabsStyles';
import { useScrollingToSelectedTab } from './useScrollingToSelectedTab';

const BUTTON_WIDTH = 40;

export const useProjectChainsTabsScroll = (
  projectChainsTabs: Tab<ChainID>[],
  selectedTabId?: ChainID,
) => {
  const { classes, cx } = useProjectChainsTabsStyles();

  const refTabsInner = useRef<HTMLDivElement>(null);
  const refTabsScrollWrapper = useRef<HTMLDivElement>(null);

  const [isForwardButtonVisible, setForwardButtonVisible] = useState(false);
  const [isBackButtonVisible, setBackButtonVisible] = useState(false);

  useEffect(
    () => {
      const wrapperElement = refTabsScrollWrapper.current;

      if (wrapperElement) {
        const hasOverflowingChildren =
          wrapperElement.offsetHeight < wrapperElement.scrollHeight ||
          wrapperElement.offsetWidth < wrapperElement.scrollWidth;

        setForwardButtonVisible(hasOverflowingChildren);
      }
    },
    // checking if wrapper width changed or tabs changed
    [refTabsInner.current?.offsetWidth, projectChainsTabs],
  );

  const onScroll = useCallback(() => {
    const wrapperElement = refTabsScrollWrapper.current;

    if (wrapperElement) {
      const hasOverflowingChildren =
        wrapperElement.offsetHeight < wrapperElement.scrollHeight ||
        wrapperElement.offsetWidth < wrapperElement.scrollWidth;

      const isScrolledToEnd =
        wrapperElement.scrollLeft + BUTTON_WIDTH >=
        wrapperElement.scrollWidth - wrapperElement.offsetWidth;

      if (isScrolledToEnd) {
        setForwardButtonVisible(false);
      } else {
        setForwardButtonVisible(hasOverflowingChildren);
      }

      const isWrapperScrolled = wrapperElement?.scrollLeft > 0;

      setBackButtonVisible(isWrapperScrolled);
    }
  }, []);

  const onClickScrollToEnd = useCallback(() => {
    const wrapperElement = refTabsScrollWrapper.current;

    if (wrapperElement) {
      wrapperElement.scrollTo({
        left: wrapperElement.scrollWidth + BUTTON_WIDTH,
        behavior: 'smooth',
      });
    }
  }, []);

  const onClickScrollToStart = useCallback(() => {
    const wrapperElement = refTabsScrollWrapper.current;

    if (wrapperElement) {
      wrapperElement.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  }, []);

  useScrollingToSelectedTab(selectedTabId);

  const scrollBackBtn = (
    <ScrollButton
      onClick={onClickScrollToStart}
      className={cx(classes.btnArrow, classes.btnBack)}
      name={<ArrowLeftSmall />}
      isButtonVisible={isBackButtonVisible}
    />
  );

  const scrollForwardBtn = (
    <ScrollButton
      onClick={onClickScrollToEnd}
      className={cx(classes.btnArrow, classes.btnForward)}
      name={<ArrowRightSmall />}
      isButtonVisible={isForwardButtonVisible}
    />
  );

  return {
    refTabsInner,
    refTabsScrollWrapper,
    scrollForwardBtn,
    scrollBackBtn,
    onScroll,
  };
};
