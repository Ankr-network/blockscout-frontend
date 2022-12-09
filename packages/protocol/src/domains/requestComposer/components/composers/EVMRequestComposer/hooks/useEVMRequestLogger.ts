import { useEVMRequest } from './useEVMRequest';
import { useLogger } from '../../../Logger/hooks/useLogger';
import { useRequestComposerLogs } from 'domains/requestComposer/hooks/useRequestComposerLogs';

export const useEVMRequestLogger = () => {
  const loggerData = useLogger();

  const EVMRequestData = useEVMRequest();

  return {
    ...useRequestComposerLogs({ ...loggerData, request: EVMRequestData }),
    logger: loggerData,
  };
};
