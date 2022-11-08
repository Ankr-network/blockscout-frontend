export function hasMetamask(): boolean {
  return Boolean(window?.ethereum);
}
