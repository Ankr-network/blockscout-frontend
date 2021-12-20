import React, { ReactNode } from 'react';
import * as Sentry from '@sentry/react';

export const ErrorBoundary = ({ children }: { children: ReactNode }) => {
  return (
    <Sentry.ErrorBoundary fallback={<>TODO: Error page</>} showDialog>
      {children}
    </Sentry.ErrorBoundary>
  );
};
