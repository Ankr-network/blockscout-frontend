import { ScrollContainer } from 'react-indiana-drag-scroll';

import { useStyles } from './TabsManagerStyles';
import { DefaultTabID, TabsManagerProps } from './TabsManagerTypes';
import { Tab } from './components/Tab';

// A named function is used here to allow using generic types
// and avoid jsx-parcer collisions
export function TabsManager<TI = DefaultTabID>({
  additionalContent,
  allowSingleTab,
  className = '',
  classNameTab,
  classNameTabsInner,
  classNameTabsWrapper,
  orientation = 'horizontal',
  selectedTab,
  tabs,
  title,
}: TabsManagerProps<TI>) {
  const { classes, cx } = useStyles({ orientation });

  return (
    <>
      <div className={cx(classes.tabs, className)}>
        <ScrollContainer className={cx(classes.right, classNameTabsWrapper)}>
          {title}
          {/* doesn't show tabs if there is only one of them */}
          <div className={cx(classes.tabsInner, classNameTabsInner)}>
            {(allowSingleTab || tabs.length > 1) &&
              tabs.map((tab, index) => (
                <Tab
                  {...tab}
                  className={classNameTab}
                  index={index}
                  key={tab.id}
                  selectedTab={selectedTab}
                />
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
