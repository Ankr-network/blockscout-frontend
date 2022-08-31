import { createBrowserHistory, createMemoryHistory } from 'history';

import packageJson from '../../../../package.json';

import { isWebEnvironment } from './isWebEnvironment';

export const historyInstance = isWebEnvironment()
  ? createBrowserHistory({
      basename: packageJson.homepage,
    })
  : createMemoryHistory();
