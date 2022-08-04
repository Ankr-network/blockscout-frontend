// todo: refactor
export const getDemoProviderName = (addr?: string): string | undefined => {
  return addr ? 'Test provider' : undefined;
};
