import mixpanel, { Callback, Dict, RequestOptions } from 'mixpanel-browser';

export interface TrackMixpanelParams {
  event: string;
  options?: RequestOptions | Callback;
  properties?: Dict;
}

export const track = ({ event, options, properties }: TrackMixpanelParams) => {
  try {
    mixpanel.track(event, properties, options);
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};
