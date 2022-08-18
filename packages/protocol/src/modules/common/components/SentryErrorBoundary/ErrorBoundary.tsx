import { t } from 'modules/i18n/utils/intl';
import { Error } from './Error';

export interface ErrorBoundaryProps {
  error: Error;
}

const CHUNK_LOAD_ERROR = 'ChunkLoadError';

export const ErrorBoundary = ({ error }: ErrorBoundaryProps) => {
  if (error.name === CHUNK_LOAD_ERROR) {
    return (
      <Error
        title={t('error-boundary.chunk-load-error.title')}
        description={t('error-boundary.chunk-load-error.description')}
        buttonText={t('error-boundary.chunk-load-error.button')}
      />
    );
  }

  return (
    <Error
      title={t('error-boundary.common.title')}
      description={t('error-boundary.common.description')}
      buttonText={t('error-boundary.common.button')}
    />
  );
};
