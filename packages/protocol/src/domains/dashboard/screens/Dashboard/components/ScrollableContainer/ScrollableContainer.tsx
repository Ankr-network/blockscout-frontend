import Scrollbars from 'react-custom-scrollbars';
import { ReactNode, useCallback } from 'react';

import { useScrollableContainerStyles } from './ScrollableContainerStyles';

export interface ViewProps {
  style: React.CSSProperties;
}

export interface ScrollableContainerProps {
  children?: ReactNode;
}

export const ScrollableContainer = ({ children }: ScrollableContainerProps) => {
  const { classes } = useScrollableContainerStyles();

  const renderView = useCallback(
    (props: ViewProps) => <div {...props} className={classes.view} />,
    [classes.view],
  );

  return <Scrollbars renderView={renderView}>{children}</Scrollbars>;
};
