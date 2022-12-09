import { useCChainRequest } from './useCChainRequest';
import { useLogger } from 'domains/requestComposer/components/Logger/hooks/useLogger';
import { useRequestComposerLogs } from 'domains/requestComposer/hooks/useRequestComposerLogs';

export const useCChainRequestLogger = () => {
  const loggerData = useLogger();

  const requestData = useCChainRequest();

  return useRequestComposerLogs({ ...loggerData, request: requestData });
};
