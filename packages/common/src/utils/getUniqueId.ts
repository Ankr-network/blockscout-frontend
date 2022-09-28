let id = 0;
/*
 * Naive but blazing fast
 */
export function getUniqueId(): string {
  return `${id++}`;
}
