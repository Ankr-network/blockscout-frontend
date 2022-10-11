import { ReactNode } from 'react';
import classNames from 'classnames';
import { Box } from '@material-ui/core';

import { AngleDownIcon } from 'uiKit/Icons/AngleDownIcon';
import { useCollapse } from './hooks/useCollapse';
import { useStyles } from './CollapseStyles';

export interface CollapseProps {
  className?: string;
  content: ReactNode;
  header: ReactNode;
  isCollapsed?: boolean;
  isCollapsible?: boolean;
  onCollapse?: (isCollapsed: boolean) => void;
  collapsedIcon?: ReactNode;
  uncollapsedIcon?: ReactNode;
}

export const Collapse = ({
  className,
  content,
  header,
  collapsedIcon = <AngleDownIcon />,
  uncollapsedIcon,
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
      <Box className={classNames(className, classes.header)} onClick={onClick}>
        {header}
        {isCollapsible &&
          (!isCollapsed && uncollapsedIcon ? (
            uncollapsedIcon
          ) : (
            <Box className={classes.icon}>{collapsedIcon}</Box>
          ))}
      </Box>
      {!isCollapsed && content}
    </>
  );
};
