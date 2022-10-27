import classNames from 'classnames';
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
}: TabsManagerProps<TI>) {
  const classes = useStyles({ orientation });

  return (
    <>
      <div className={classNames(classes.tabs, className)}>
        <div className={classes.right}>
          {title}
          {/* doesn't show tabs if there is only one of them */}
          {(allowSingleTab || tabs.length > 1) &&
            tabs.map(({ id, isDisabled, onSelect, ...tab }, index) => (
              <div
                className={classes.tab}
                key={id}
                onClick={onSelect}
                role="tab"
                tabIndex={index}
              >
                {typeof tab.title === 'function'
                  ? tab.title(id === selectedTab?.id, isDisabled, id)
                  : tab.title}
              </div>
            ))}
        </div>
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
