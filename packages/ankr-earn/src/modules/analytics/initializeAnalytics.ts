import mixpanel from 'mixpanel-browser';

import { currentEnv, MIXPANEL_TOKEN } from 'modules/common/const';
import { Env } from 'modules/common/types';

export const initializeAnalytics = (): void => {
  try {
    if (MIXPANEL_TOKEN) {
      mixpanel.init(MIXPANEL_TOKEN, {
        debug: currentEnv === Env.Develop,
        ignore_dnt: currentEnv !== Env.Develop,
      });
    }
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
};
