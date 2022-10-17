import { useLogger } from '../../components/Logger/hooks/useLogger';
import { useRequestComposerLogs } from '../../hooks/useRequestComposerLogs';
import { useHarmonyChainRequest } from './useHarmonyChainRequest';

export const useHarmonyChainRequestLogger = () => {
  const loggerData = useLogger();

  const requestData = useHarmonyChainRequest();

  return {
    ...useRequestComposerLogs({ ...loggerData, request: requestData }),
    logger: loggerData,
  };
};
