import Scrollbars from 'react-custom-scrollbars';
import { ReactNode, useCallback } from 'react';

import { useScrollableContainerStyles } from './ScrollableContainerStyles';

export interface ViewProps {
  className?: string;
  style: React.CSSProperties;
}

export interface ScrollableContainerProps {
  View: React.FC<ViewProps>;
  children?: ReactNode;
  className?: string;
  viewClassName?: string;
}

export const ScrollableContainer = ({
  View,
  children,
  className,
  viewClassName,
}: ScrollableContainerProps) => {
  const { classes, cx } = useScrollableContainerStyles();

  const renderView = useCallback(
    ({ style }: ViewProps) => <View className={viewClassName} style={style} />,
    [View, viewClassName],
  );

  return (
    <Scrollbars className={cx(classes.root, className)} renderView={renderView}>
      {children}
    </Scrollbars>
  );
};
