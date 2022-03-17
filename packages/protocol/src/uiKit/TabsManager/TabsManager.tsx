import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import {
  TabID,
  TabsManagerGapSize,
  TabsManagerProps,
} from './TabsManagerTypes';
import { useOverridingStyles, useStyles } from './TabsManagerStyles';

export function TabsManager({
  additionalContent,
  gapSize = TabsManagerGapSize.DEFAULT,
  initialTabID,
  onTabSelect,
  tabs,
  title,
}: TabsManagerProps) {
  const [selectedTabID, setSelectedTabID] = useState(
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
  const classes = useStyles({ gapSize });
  const overridingClasses = useOverridingStyles({ gapSize });

  return (
    <div className={classes.root}>
      <div className={classes.tabs}>
        <div className={classes.right}>
          {title && (
            <div
              className={classNames(classes.tab, overridingClasses.titleTab)}
            >
              {title}
            </div>
          )}
          {/* doesn't show tabs if there is only one of them */}
          {tabs.length > 1 &&
            tabs.map(({ id, isDisabled, ...tab }, index) => {
              const isSelected = id === selectedTabID;
              const className = classNames(classes.tab, {
                [overridingClasses.selectedTab]: isSelected,
                [overridingClasses.disabledTab]: isDisabled,
              });

              return (
                <div
                  className={className}
                  key={id}
                  role="tab"
                  onClick={getTabTitleClickHandler(id)}
                  tabIndex={index}
                >
                  {typeof tab.title === 'function'
                    ? tab.title(isSelected, isDisabled)
                    : tab.title}
                </div>
              );
            })}
        </div>
        {additionalContent && (
          <div className={classes.left}>{additionalContent}</div>
        )}
      </div>
      <div className={classes.content}>{content}</div>
    </div>
  );
}
