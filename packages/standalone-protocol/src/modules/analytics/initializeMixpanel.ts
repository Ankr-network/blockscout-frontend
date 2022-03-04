import mixpanel from 'mixpanel-browser';

import { isDev } from 'modules/common/utils/isProd';

const { REACT_APP_MIXPANEL_TOKEN } = process.env;

export const initializeMixpanel = () => {
  try {
    if (REACT_APP_MIXPANEL_TOKEN) {
      mixpanel.init(REACT_APP_MIXPANEL_TOKEN, {
        debug: isDev(),
        ignore_dnt: !isDev(),
      });
    }
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
};
