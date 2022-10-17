import {
  RequestComposerLogsResult,
  useRequestComposerLogs,
} from '../../hooks/useRequestComposerLogs';
import {
  UseLoggerResult,
  useLogger,
} from '../../components/Logger/hooks/useLogger';
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
