import * as Sentry from '@sentry/react';
import { ReactNode } from 'react';

import { ErrorBoundary } from './ErrorBoundary';

interface SentryErrorBoundaryProps {
  children: ReactNode;
}

export const SentryErrorBoundary = ({ children }: SentryErrorBoundaryProps) => {
  return (
    <Sentry.ErrorBoundary
      fallback={ErrorBoundary}
      onError={(error: Error, componentStack: string) => {
        // eslint-disable-next-line
        console.log(componentStack, error);
      }}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};
