import { usePChainRequest } from './usePChainRequest';
import { useLogger } from '../../../components/Logger/hooks/useLogger';
import { useRequestComposerLogs } from '../../../hooks/useRequestComposerLogs';

export const usePChainRequestLogger = () => {
  const loggerData = useLogger();

  const requestData = usePChainRequest();

  return useRequestComposerLogs({ ...loggerData, request: requestData });
};
