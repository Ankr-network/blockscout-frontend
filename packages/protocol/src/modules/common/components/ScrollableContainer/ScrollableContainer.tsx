import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars';
import { useCallback } from 'react';

import { useScrollableContainerStyles } from './ScrollableContainerStyles';

export interface ViewProps {
  style: React.CSSProperties;
}

export interface ScrollableContainerProps extends ScrollbarProps {}

export const ScrollableContainer = (props: ScrollableContainerProps) => {
  const { classes } = useScrollableContainerStyles();

  const renderView = useCallback(
    (viewProps: ViewProps) => <div {...viewProps} className={classes.view} />,
    [classes.view],
  );

  return <Scrollbars {...props} renderView={renderView} />;
};
