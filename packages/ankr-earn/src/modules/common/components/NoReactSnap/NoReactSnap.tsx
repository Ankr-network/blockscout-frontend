import React, { ReactNode } from 'react';

interface INoReactSnapProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

/**
 * Almost the same as [NoSsr](https://material-ui.com/components/no-ssr/#no-ssr)
 * from [MUI](https://material-ui.com) but for
 * [react-snap](https://github.com/stereobooster/react-snap)
 */
export const NoReactSnap = ({ children, fallback }: INoReactSnapProps) => {
  const isReactSnap = navigator.userAgent === 'ReactSnap';

  if (isReactSnap && fallback) {
    return <>{fallback}</>;
  }

  if (isReactSnap) {
    return null;
  }

  return <>{children}</>;
};
