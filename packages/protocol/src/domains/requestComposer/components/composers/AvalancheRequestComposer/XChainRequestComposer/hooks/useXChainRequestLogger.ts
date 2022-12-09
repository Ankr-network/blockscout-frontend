import { useXChainRequest } from './useXChainRequest';
import { useLogger } from 'domains/requestComposer/components/Logger/hooks/useLogger';
import { useRequestComposerLogs } from 'domains/requestComposer/hooks/useRequestComposerLogs';

export const useXChainRequestLogger = () => {
  const loggerData = useLogger();

  const requestData = useXChainRequest();

  return useRequestComposerLogs({ ...loggerData, request: requestData });
};
