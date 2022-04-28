import React from 'react';

import { IApiChainURL } from 'domains/chains/api/queryChains';
import { EndpointUrl } from '../EndpointUrl';
import { useStyles } from './EndpointUrlsStyles';

export interface EndpointUrlsProps {
  urls: IApiChainURL[];
}

export const EndpointUrls = ({ urls }: EndpointUrlsProps) => {
  const classes = useStyles();

  return (
    <div className={classes.endpointUrlsRoot}>
      {urls.map(({ rpc, ws }) => (
        <div className={classes.endpoint} key={rpc + ws}>
          <EndpointUrl url={rpc} />
          {ws && <EndpointUrl url={ws} />}
        </div>
      ))}
    </div>
  );
};
