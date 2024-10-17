import { OverlaySpinner } from '@ankr.com/ui';

import { useNoDataGuardStyles } from './NoDataGuardStyles';

export interface NoDataGuardProps<Data> {
  children: JSX.Element;
  data: Data[];
  isEmpty?: (data: Data[]) => boolean;
  isLoading?: boolean;
  text?: string;
}

export function NoDataGuard<Data>({
  children,
  data,
  isLoading,
  text,
  isEmpty = (list: Data[]) => list.length === 0,
}: NoDataGuardProps<Data>) {
  const { classes } = useNoDataGuardStyles();

  if (isLoading) {
    return <OverlaySpinner />;
  }

  if (isEmpty(data)) {
    return <div className={classes.root}>{text || 'No Data'}</div>;
  }

  return children;
}
