import { useLogger } from 'domains/requestComposer/components/Logger/hooks/useLogger';
import { useRequestComposerLogs } from 'domains/requestComposer/hooks/useRequestComposerLogs';

import { usePChainRequest } from './usePChainRequest';

export const usePChainRequestLogger = () => {
  const loggerData = useLogger();

  const requestData = usePChainRequest();

  return useRequestComposerLogs({ ...loggerData, request: requestData });
};
