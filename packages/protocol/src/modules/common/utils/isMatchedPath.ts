import { matchPath } from 'react-router';

export const isMatchedPath = (pathname: string, path: string) => {
  return matchPath(pathname, {
    path,
    exact: true,
    strict: true,
  });
};
