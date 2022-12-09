import { useLogger } from '../../../Logger/hooks/useLogger';
import { useRequestComposerLogs } from 'domains/requestComposer/hooks/useRequestComposerLogs';
import { useNearRequest } from './useNearRequest';

export const useNearRequestLogger = () => {
  const loggerData = useLogger();

  const NearRequestData = useNearRequest();

  return {
    ...useRequestComposerLogs({ ...loggerData, request: NearRequestData }),
    logger: loggerData,
  };
};
