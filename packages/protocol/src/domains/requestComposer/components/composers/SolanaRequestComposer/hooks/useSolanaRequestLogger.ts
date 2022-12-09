import {
  RequestComposerLogsResult,
  useRequestComposerLogs,
} from 'domains/requestComposer/hooks/useRequestComposerLogs';
import { UseLoggerResult, useLogger } from '../../../Logger/hooks/useLogger';
import { useSolanaRequest } from './useSolanaRequest';

export interface SolanaRequestLoggerResult extends RequestComposerLogsResult {
  logger: UseLoggerResult;
}

export const useSolanaRequestLogger = (): SolanaRequestLoggerResult => {
  const logger = useLogger();

  const request = useSolanaRequest();

  const logs = useRequestComposerLogs({ ...logger, request });

  return { ...logs, logger };
};
