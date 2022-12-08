import { useTronChainRequest } from './useTronChainRequest';
import { useLogger } from '../../../Logger/hooks/useLogger';
import { useRequestComposerLogs } from 'domains/requestComposer/hooks/useRequestComposerLogs';

export const useTronChainRequestLogger = () => {
  const loggerData = useLogger();

  const requestData = useTronChainRequest();

  return useRequestComposerLogs({ ...loggerData, request: requestData });
};
