import classNames from 'classnames';
import { useCallback, useState } from 'react';

import { useStyles } from './TabsManagerStyles';
import { DefaultTabID, TabID, TabsManagerProps } from './TabsManagerTypes';

// A named function is used here to allow using generic types
// and avoid jsx-parcer collisions
export function TabsManager<TI = DefaultTabID>({
  additionalContent,
  initialTabID,
  onTabSelect,
  tabs,
  title,
  className = '',
}: TabsManagerProps<TI>) {
  const [selectedTabID, setSelectedTabID] = useState<TabID<TI>>(
    typeof initialTabID === 'undefined' ? tabs[0]?.id : initialTabID,
  );

  const getTabTitleClickHandler = useCallback(
    (id: TabID<TI>) => () => {
      const isDisabled = tabs.find(tab => tab.id === id)?.isDisabled;

      if (!isDisabled) {
        setSelectedTabID(id);

        if (onTabSelect) {
          onTabSelect(id);
        }
      }
    },
    [tabs, onTabSelect],
  );

  const content = tabs.find(({ id }) => id === selectedTabID)?.content;
  const classes = useStyles();

  return (
    <>
      <div className={classNames(classes.tabs, className)}>
        <div className={classes.right}>
          {title}
          {/* doesn't show tabs if there is only one of them */}
          {tabs.length > 1 &&
            tabs.map(({ id, isDisabled, ...tab }, index) => (
              <div
                key={id}
                role="tab"
                onClick={getTabTitleClickHandler(id)}
                tabIndex={index}
                className={classes.tab}
              >
                {typeof tab.title === 'function'
                  ? tab.title(id === selectedTabID, isDisabled, id)
                  : tab.title}
              </div>
            ))}
        </div>
        {additionalContent && (
          <div className={classes.left}>{additionalContent}</div>
        )}
      </div>
      {content}
    </>
  );
}
