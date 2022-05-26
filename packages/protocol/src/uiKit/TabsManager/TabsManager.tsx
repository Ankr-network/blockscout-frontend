import React, { useCallback, useState } from 'react';

import { TabID, TabsManagerProps } from './TabsManagerTypes';
import { useStyles } from './TabsManagerStyles';
import classNames from 'classnames';

export const TabsManager = ({
  additionalContent,
  initialTabID,
  onTabSelect,
  tabs,
  title,
  className = '',
}: TabsManagerProps) => {
  const [selectedTabID, setSelectedTabID] = useState<TabID>(
    typeof initialTabID === 'undefined' ? tabs[0]?.id : initialTabID,
  );

  const getTabTitleClickHandler = useCallback(
    (id: TabID) => () => {
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
              >
                {typeof tab.title === 'function'
                  ? tab.title(id === selectedTabID, isDisabled)
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
};
