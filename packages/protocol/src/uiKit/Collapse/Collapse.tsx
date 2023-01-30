import { ReactNode } from 'react';

import { Box } from '@mui/material';

import { ArrowDown } from '@ankr.com/ui';
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
  collapsedIcon = <ArrowDown />,
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

  const { classes, cx } = useStyles({ isCollapsed, isCollapsible });

  return (
    <>
      <Box className={cx(className, classes.header)} onClick={onClick}>
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
