import { Log, Message } from '../../composers/types';

export const getLogByMessage = (message: Message): Log => ({
  ...message,
  timestamp: Date.now(),
});
