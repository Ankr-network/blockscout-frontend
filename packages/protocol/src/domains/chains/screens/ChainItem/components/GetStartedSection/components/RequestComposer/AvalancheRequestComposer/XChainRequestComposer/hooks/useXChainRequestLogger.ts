import { useXChainRequest } from './useXChainRequest';
import { useLogger } from '../../../components/Logger/hooks/useLogger';
import { useRequestComposerLogs } from '../../../hooks/useRequestComposerLogs';

export const useXChainRequestLogger = () => {
  const loggerData = useLogger();

  const requestData = useXChainRequest();

  return useRequestComposerLogs({ ...loggerData, request: requestData });
};
