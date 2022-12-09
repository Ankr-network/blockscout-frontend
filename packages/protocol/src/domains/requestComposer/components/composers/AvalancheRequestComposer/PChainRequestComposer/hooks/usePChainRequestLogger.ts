import { usePChainRequest } from './usePChainRequest';
import { useLogger } from 'domains/requestComposer/components/Logger/hooks/useLogger';
import { useRequestComposerLogs } from 'domains/requestComposer/hooks/useRequestComposerLogs';

export const usePChainRequestLogger = () => {
  const loggerData = useLogger();

  const requestData = usePChainRequest();

  return useRequestComposerLogs({ ...loggerData, request: requestData });
};
