export function isExternalPath(path: string) {
  return (
    path.startsWith('http') ||
    path.startsWith('https') ||
    path.startsWith('mailto') ||
    path.startsWith('tel')
  );
}
