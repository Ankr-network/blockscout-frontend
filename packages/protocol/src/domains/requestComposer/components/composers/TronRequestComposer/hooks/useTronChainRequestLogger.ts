import { useRequestComposerLogs } from 'domains/requestComposer/hooks/useRequestComposerLogs';

import { useTronChainRequest } from './useTronChainRequest';
import { useLogger } from '../../../Logger/hooks/useLogger';

export const useTronChainRequestLogger = () => {
  const loggerData = useLogger();

  const requestData = useTronChainRequest();

  return useRequestComposerLogs({ ...loggerData, request: requestData });
};
