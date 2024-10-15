export const clearPathPrefix = (pathString: string) => {
  if (pathString?.includes('/')) {
    const [, path] = pathString.split('/');

    return path;
  }

  return pathString;
};
