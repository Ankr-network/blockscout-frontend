import { EventProvider, ProviderEvents } from './types';

export function getProvider(provider: any): EventProvider | null {
  if (!provider?.on) return null;

  return provider as EventProvider;
}

export const EVENTS = Object.values(ProviderEvents);
