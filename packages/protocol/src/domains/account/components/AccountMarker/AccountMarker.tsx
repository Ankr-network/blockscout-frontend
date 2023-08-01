import { AccountMarkerProps } from './types';
import { useStyles } from './AccountMarkerStyles';

export const AccountMarker = ({ className, status }: AccountMarkerProps) => {
  const { classes, cx } = useStyles(status);

  return <div className={cx(classes.root, className)} />;
};
