import { Endpoint } from '../Endpoint';
import { EndpointGroup } from 'modules/endpoints/types';
import { EndpointsHeader } from '../EndpointsHeader';
import { root } from '../../const';
import { t } from 'modules/i18n/utils/intl';
import { useWSEndpointsStyles } from './WSEndpointsStyles';

export interface WSEndpointsProps {
  group: EndpointGroup;
}

const title = t(`${root}.endpoints.websocket-title`);

export const WSEndpoints = ({ group: { urls } }: WSEndpointsProps) => {
  const wss = urls.flatMap(({ ws }) => (ws ? [ws] : []));

  const classes = useWSEndpointsStyles();

  return wss.length ? (
    <div className={classes.wsEndpoints}>
      <EndpointsHeader title={title} />
      {wss.map(url => (
        <Endpoint url={url} key={url} />
      ))}
    </div>
  ) : null;
};
