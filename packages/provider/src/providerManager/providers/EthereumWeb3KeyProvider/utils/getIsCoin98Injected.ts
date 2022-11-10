export const getIsCoin98Injected = (): boolean => {
  const { coin98, ethereum } = window as any;
  return !!(coin98 && ethereum);
};
