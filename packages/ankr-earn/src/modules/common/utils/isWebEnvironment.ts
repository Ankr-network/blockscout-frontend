export function isWebEnvironment(): boolean {
  return typeof document !== 'undefined';
}
