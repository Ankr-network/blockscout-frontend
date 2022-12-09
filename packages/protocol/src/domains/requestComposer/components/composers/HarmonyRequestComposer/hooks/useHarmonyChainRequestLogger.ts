import { useLogger } from '../../../Logger/hooks/useLogger';
import { useRequestComposerLogs } from 'domains/requestComposer/hooks/useRequestComposerLogs';
import { useHarmonyChainRequest } from './useHarmonyChainRequest';

export const useHarmonyChainRequestLogger = () => {
  const loggerData = useLogger();

  const requestData = useHarmonyChainRequest();

  return {
    ...useRequestComposerLogs({ ...loggerData, request: requestData }),
    logger: loggerData,
  };
};
