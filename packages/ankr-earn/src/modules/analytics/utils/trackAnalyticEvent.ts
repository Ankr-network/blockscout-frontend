import mixpanel, { Dict } from 'mixpanel-browser';

interface ITrackMixpanel {
  event: string;
  properties?: Dict;
}

export const trackAnalyticEvent = ({
  event,
  properties,
}: ITrackMixpanel): void => {
  try {
    mixpanel.track(event, properties);
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
};
