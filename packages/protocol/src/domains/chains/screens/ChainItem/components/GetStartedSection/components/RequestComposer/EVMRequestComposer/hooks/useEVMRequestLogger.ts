import { useEVMRequest } from './useEVMRequest';
import { useLogger } from '../../components/Logger/hooks/useLogger';
import { useRequestComposerLogs } from '../../hooks/useRequestComposerLogs';

export const useEVMRequestLogger = () => {
  const loggerData = useLogger();

  const EVMRequestData = useEVMRequest();

  return {
    ...useRequestComposerLogs({ ...loggerData, request: EVMRequestData }),
    logger: loggerData,
  };
};
