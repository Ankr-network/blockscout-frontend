import { EventProvider } from '@ankr.com/provider';

export const isEventProvider = (provider: unknown): provider is EventProvider =>
  typeof provider === 'object' &&
  provider !== null &&
  'on' in provider &&
  typeof provider.on === 'function';
