import { useRequestComposerLogs } from 'domains/requestComposer/hooks/useRequestComposerLogs';

import { useEVMRequest } from './useEVMRequest';
import { useLogger } from '../../../Logger/hooks/useLogger';

export const useEVMRequestLogger = () => {
  const loggerData = useLogger();

  const EVMRequestData = useEVMRequest();

  return {
    ...useRequestComposerLogs({ ...loggerData, request: EVMRequestData }),
    logger: loggerData,
  };
};
