import { useCChainRequest } from './useCChainRequest';
import { useLogger } from '../../../components/Logger/hooks/useLogger';
import { useRequestComposerLogs } from '../../../hooks/useRequestComposerLogs';

export const useCChainRequestLogger = () => {
  const loggerData = useLogger();

  const requestData = useCChainRequest();

  return useRequestComposerLogs({ ...loggerData, request: requestData });
};
