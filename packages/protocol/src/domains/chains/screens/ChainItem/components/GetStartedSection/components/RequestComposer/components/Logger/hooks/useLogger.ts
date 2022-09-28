import { useCallback, useMemo, useState } from 'react';

import { Log, Message, MessageType } from '../../../types';
import { formatResponseTime } from '../utils/formatResponseTime';
import { getLogByMessage } from '../utils/getLogByMessage';
import { root } from '../const';
import { t } from 'modules/i18n/utils/intl';

const messages = `${root}.messages`;
const initMessage = `${messages}.init`;
const sendRequestMessage = `${messages}.send-request`;
const responseTimeMessage = `${messages}.response-time`;

export interface UseLoggerResult {
  clear: () => void;
  log: (message: Message) => void;
  logError: (error: unknown) => void;
  logInit: () => void;
  logRequest: (method: string) => void;
  logResponse: (data: unknown) => void;
  logResponseTime: (ms: number) => void;
  logs: Log[];
}

export const useLogger = (): UseLoggerResult => {
  const [logs, setLogs] = useState<Log[]>([]);

  const log = useCallback((message: Message) => {
    setLogs(currentLogs => [...currentLogs, getLogByMessage(message)]);
  }, []);

  const clear = useCallback(() => {
    setLogs([]);
  }, []);

  const logInit = useCallback(() => {
    log({
      data: t(initMessage),
      type: MessageType.Info,
    });
  }, [log]);

  const logRequest = useCallback(
    (method: string) => {
      log({
        data: t(sendRequestMessage, { method }),
        type: MessageType.Input,
      });
    },
    [log],
  );

  const logResponse = useCallback(
    (data: unknown) => {
      log({
        data,
        type: MessageType.Success,
      });
    },
    [log],
  );

  const logError = useCallback(
    (error: unknown) => {
      log({
        data: error,
        type: MessageType.Error,
      });
    },
    [log],
  );

  const logResponseTime = useCallback(
    (ms: number) => {
      log({
        data: t(responseTimeMessage, { ms: formatResponseTime(ms) }),
        type: MessageType.Time,
      });
    },
    [log],
  );

  return useMemo(
    () => ({
      clear,
      log,
      logError,
      logInit,
      logRequest,
      logResponse,
      logResponseTime,
      logs,
    }),
    [
      clear,
      log,
      logError,
      logInit,
      logRequest,
      logResponse,
      logResponseTime,
      logs,
    ],
  );
};
