import { createBrowserHistory, createMemoryHistory } from 'history';
import { isWebEnvironment } from './isWebEnvironment';
import packageJson from '../../../../package.json';

export const historyInstance = isWebEnvironment()
  ? createBrowserHistory({
      basename: packageJson.homepage,
    })
  : createMemoryHistory();
