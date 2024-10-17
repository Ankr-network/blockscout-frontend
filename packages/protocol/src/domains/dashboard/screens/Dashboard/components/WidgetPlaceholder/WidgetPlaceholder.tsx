import { NoDataGuardProps } from '@ankr.com/telemetry/src/components/NoDataGuard';
import { OverlaySpinner } from '@ankr.com/ui';

import { NoDataPlaceholder } from '../NoDataPlaceholder';
import { useWidgetPlaceholderStyles } from './useWidgetPlaceholderStyles';

export interface IWidgetPlaceholderProps<Data> extends NoDataGuardProps<Data> {}

export function WidgetPlaceholder<Data>({
  children,
  data,
  isEmpty = (list: Data[]) => list.length === 0,
  isLoading,
}: IWidgetPlaceholderProps<Data>) {
  const { classes } = useWidgetPlaceholderStyles();

  if (isLoading) {
    return <OverlaySpinner />;
  }

  if (isEmpty(data)) {
    return <NoDataPlaceholder className={classes.placeholder} />;
  }

  return children;
}
