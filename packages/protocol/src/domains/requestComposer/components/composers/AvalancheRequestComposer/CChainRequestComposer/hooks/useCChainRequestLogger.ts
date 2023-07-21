import { useLogger } from 'domains/requestComposer/components/Logger/hooks/useLogger';
import { useRequestComposerLogs } from 'domains/requestComposer/hooks/useRequestComposerLogs';

import { useCChainRequest } from './useCChainRequest';

export const useCChainRequestLogger = () => {
  const loggerData = useLogger();

  const requestData = useCChainRequest();

  return useRequestComposerLogs({ ...loggerData, request: requestData });
};
