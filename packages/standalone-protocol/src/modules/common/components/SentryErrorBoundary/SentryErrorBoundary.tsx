import * as Sentry from '@sentry/react';
import { ChainId } from 'domains/chains/api/chain';
import { ReactNode } from 'react';

import { ErrorBoundary } from './ErrorBoundary';

interface SentryErrorBoundaryProps {
  children: ReactNode;
  chainId: ChainId;
}

export const SentryErrorBoundary = ({
  children,
  chainId,
}: SentryErrorBoundaryProps) => {
  return (
    <Sentry.ErrorBoundary
      fallback={errorData => <ErrorBoundary {...errorData} chainId={chainId} />}
      onError={(error: Error, componentStack: string) => {
        // eslint-disable-next-line
        console.log(componentStack, error);
      }}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};
