import { Log, Message } from '../../../types';

export const getLogByMessage = (message: Message): Log => ({
  ...message,
  timestamp: Date.now(),
});
