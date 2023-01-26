import { ChainId } from 'domains/chains/api/chain';
import { t } from 'modules/i18n/utils/intl';
import { Error } from './Error';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { CrossMenu } from 'domains/chains/screens/ChainItem/components/CrossMenu';

export interface ErrorBoundaryProps {
  error: Error;
  chainId: ChainId;
}

const CHUNK_LOAD_ERROR = 'ChunkLoadError';

export const ErrorBoundary = ({ error, chainId }: ErrorBoundaryProps) => {
  let errorContent = (
    <Error
      title={t('error-boundary.common.title')}
      description={t('error-boundary.common.description')}
      buttonText={t('error-boundary.common.button')}
    />
  );

  if (error.name === CHUNK_LOAD_ERROR) {
    errorContent = (
      <Error
        title={t('error-boundary.chunk-load-error.title')}
        description={t('error-boundary.chunk-load-error.description')}
        buttonText={t('error-boundary.chunk-load-error.button')}
      />
    );
  }

  return (
    <DefaultLayout>
      <>
        <CrossMenu chainId={chainId} />
        {errorContent}
      </>
    </DefaultLayout>
  );
};
