import { useTronChainRequest } from './useTronChainRequest';
import { useLogger } from '../../components/Logger/hooks/useLogger';
import { useRequestComposerLogs } from '../../hooks/useRequestComposerLogs';

export const useTronChainRequestLogger = () => {
  const loggerData = useLogger();

  const requestData = useTronChainRequest();

  return useRequestComposerLogs({ ...loggerData, request: requestData });
};
