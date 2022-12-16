import mixpanel, { Dict } from 'mixpanel-browser';

interface ITrackMixpanel {
  event: string;
  properties?: Dict;
}

export const trackMixpanel = async ({ event, properties }: ITrackMixpanel) => {
  try {
    mixpanel.track(event, properties);
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
};

export const copyEndpointEvent = () =>
  trackMixpanel({ event: 'copy_endpoint' });

export const pageViewEvent = () => trackMixpanel({ event: 'Page View' });

export const visitMainSiteEvent = () =>
  trackMixpanel({ event: 'Visit ANKR from footer' });

export const visitOtherProjectEvent = (name: 'Polygon' | 'BSC' | 'Fantom') =>
  trackMixpanel({ event: `Visit ${name} from footer` });
