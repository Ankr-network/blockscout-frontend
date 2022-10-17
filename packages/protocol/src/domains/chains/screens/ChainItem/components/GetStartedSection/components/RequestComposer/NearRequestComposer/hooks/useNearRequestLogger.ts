import { useLogger } from '../../components/Logger/hooks/useLogger';
import { useRequestComposerLogs } from '../../hooks/useRequestComposerLogs';
import { useNearRequest } from './useNearRequest';

export const useNearRequestLogger = () => {
  const loggerData = useLogger();

  const NearRequestData = useNearRequest();

  return {
    ...useRequestComposerLogs({ ...loggerData, request: NearRequestData }),
    logger: loggerData,
  };
};
