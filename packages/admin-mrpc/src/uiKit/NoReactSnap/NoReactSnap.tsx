import { ReactNode } from 'react';

import { isReactSnap } from 'modules/common/utils/isReactSnap';

interface INoReactSnapProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

// why we need to use react-snap
// https:docs.aws.amazon.com/AmazonS3/latest/userguide/IndexDocumentSupport.html

/**
 * Almost the same as [NoSsr](https://material-ui.com/components/no-ssr/#no-ssr)
 * from [MUI](https://material-ui.com) but for
 * [react-snap](https://github.com/stereobooster/react-snap)
 */
export const NoReactSnap = ({ children, fallback }: INoReactSnapProps) => {
  if (isReactSnap() && fallback) {
    return <>{fallback}</>;
  }

  if (isReactSnap()) {
    return null;
  }

  return <>{children}</>;
};
