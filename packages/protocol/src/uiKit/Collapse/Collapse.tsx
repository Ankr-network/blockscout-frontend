import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { AngleDownIcon } from 'uiKit/Icons/AngleDownIcon';
import { useCollapse } from './hooks/useCollapse';
import { useStyles } from './CollapseStyles';

export interface CollapseProps {
  className?: string;
  content: ReactNode;
  header: ReactNode;
  icon?: ReactNode;
  isCollapsed?: boolean;
  isCollapsible?: boolean;
  onCollapse?: (isCollapsed: boolean) => void;
}

const defaultIcon = <AngleDownIcon />;

export const Collapse = ({
  className,
  content,
  header,
  icon,
  isCollapsed: isCollapsed_ = true,
  isCollapsible = true,
  onCollapse = () => {},
}: CollapseProps) => {
  const [isCollapsed, onClick] = useCollapse(
    isCollapsed_,
    isCollapsible,
    onCollapse,
  );

  const classes = useStyles({ isCollapsed, isCollapsible });

  return (
    <>
      <div
        className={classNames(className, classes.header)}
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        {header}
        {isCollapsible && (
          <div className={classes.icon}>{icon || defaultIcon}</div>
        )}
      </div>
      {!isCollapsed && content}
    </>
  );
};
