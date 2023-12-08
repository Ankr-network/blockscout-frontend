import { ScrollContainer } from 'react-indiana-drag-scroll';

import { useStyles } from './TabsManagerStyles';
import { DefaultTabID, TabsManagerProps } from './TabsManagerTypes';

// A named function is used here to allow using generic types
// and avoid jsx-parcer collisions
export function TabsManager<TI = DefaultTabID>({
  additionalContent,
  className = '',
  selectedTab,
  tabs,
  title,
  allowSingleTab,
  orientation = 'horizontal',
  classNameTabsWrapper,
  classNameTab,
  classNameTabsInner,
  refTabsInner,
  refTabsScrollWrapper,
  scrollBackBtn,
  onScrollTabsInner,
}: TabsManagerProps<TI>) {
  const { classes, cx } = useStyles({ orientation });

  return (
    <>
      <div className={cx(classes.tabs, className)}>
        <ScrollContainer
          className={cx(classes.right, classNameTabsWrapper)}
          ref={refTabsScrollWrapper}
          onScroll={onScrollTabsInner}
        >
          {title}
          {/* doesn't show tabs if there is only one of them */}
          <div
            className={cx(classes.tabsInner, classNameTabsInner)}
            ref={refTabsInner}
          >
            {scrollBackBtn && scrollBackBtn}
            {(allowSingleTab || tabs.length > 1) &&
              tabs.map(({ id, isDisabled, onSelect, ...tab }, index) => (
                <div
                  className={cx(classes.tab, classNameTab)}
                  key={id}
                  id={id.toString()}
                  onClick={isDisabled ? undefined : onSelect}
                  role="tab"
                  tabIndex={index}
                >
                  {typeof tab.title === 'function'
                    ? tab.title(id === selectedTab?.id, isDisabled, id)
                    : tab.title}
                </div>
              ))}
          </div>
        </ScrollContainer>
        {additionalContent && (
          <div className={classes.left}>{additionalContent}</div>
        )}
      </div>
      {typeof selectedTab?.content === 'function'
        ? selectedTab.content(selectedTab?.id)
        : selectedTab?.content}
    </>
  );
}
