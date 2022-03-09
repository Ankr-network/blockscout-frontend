export function isExternalPath(path: string): boolean {
  return (
    path.startsWith('http') ||
    path.startsWith('https') ||
    path.startsWith('mailto') ||
    path.startsWith('tel')
  );
}
