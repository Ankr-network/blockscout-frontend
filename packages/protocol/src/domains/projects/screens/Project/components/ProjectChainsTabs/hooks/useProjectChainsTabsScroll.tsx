import { ArrowLeftSmall, ArrowRightSmall } from '@ankr.com/ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChainID } from '@ankr.com/chains-list';

import { ScrollButton } from '../components/ScrollButton';
import { useProjectChainsTabsStyles } from '../useProjectChainsTabsStyles';
import { useScrollingToSelectedTab } from './useScrollingToSelectedTab';

const BUTTON_WIDTH = 40;

export const useProjectChainsTabsScroll = (selectedTabId?: ChainID) => {
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
    [refTabsInner.current?.scrollWidth],
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

  const onClickScrollForward = useCallback(() => {
    const wrapperElement = refTabsScrollWrapper.current;
    const innerElement = refTabsInner.current;

    if (wrapperElement && innerElement) {
      const visibleWidth = wrapperElement.offsetWidth;
      const totalWidth = innerElement.scrollWidth;

      const childNodes = innerElement.children;
      let itemsWidth = 0;
      let itemCount = 0;
      const offset = BUTTON_WIDTH * 2;

      // Calculate the cumulative width of the next items
      while (itemsWidth < visibleWidth && itemCount < childNodes.length) {
        const childNode = childNodes[itemCount] as HTMLElement;

        itemsWidth += childNode.offsetWidth;
        itemCount++;
      }

      const scrollPage = wrapperElement.scrollLeft + itemsWidth - offset;
      const scrollEnd = totalWidth - visibleWidth;

      const scrollWidth = Math.min(scrollPage, scrollEnd);

      wrapperElement.scrollTo({
        left: scrollWidth,
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
      onClick={onClickScrollForward}
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
