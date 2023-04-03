import mixpanel, { Callback, Dict, RequestOptions } from 'mixpanel-browser';

interface TrackMixpanelParams<Props> {
  event: string;
  options?: RequestOptions | Callback;
  properties?: Properties<Props>;
}

type Properties<P> = P extends Dict ? P : undefined;

export const track = <Props>({
  event,
  options,
  properties,
}: TrackMixpanelParams<Props>) => {
  try {
    mixpanel.track(event, properties, options);
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
};
