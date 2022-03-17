export function stringify(params: unknown, currentQuery = ''): string {
  if (!(params instanceof Object)) {
    return '';
  }

  const url = new URLSearchParams(currentQuery);
  Object.keys(params).forEach(key => {
    url.append(key, (params as never)[key]);
  });

  return url.toString();
}
