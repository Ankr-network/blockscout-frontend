import React from 'react';
import { Skeleton } from '@material-ui/lab';

import { useStyles } from './EndpointSkeletonStyles';
import { useStyles as useEndpointStyles } from '../../EndpointStyles';

export const EndpointSkeleton = () => {
  const endpointClasses = useEndpointStyles();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <Skeleton
          variant="rect"
          height={44}
          width={44}
          className={classes.img}
        />
        <Skeleton
          variant="rect"
          width={120}
          height={40}
          className={classes.rect}
        />
      </div>
      <div className={endpointClasses.section}>
        <Skeleton
          variant="rect"
          width={120}
          height={23}
          className={classes.title}
        />
        <div className={classes.links}>
          <Skeleton
            variant="rect"
            width="50%"
            height={52}
            className={classes.link}
          />
          <Skeleton
            variant="rect"
            width="50%"
            height={52}
            className={classes.link}
          />
        </div>
      </div>
      <div className={endpointClasses.section}>
        <Skeleton
          variant="rect"
          width={120}
          height={23}
          className={classes.title}
        />
        <div className={classes.endpoints}>
          <Skeleton
            variant="rect"
            width="100%"
            height={52}
            className={classes.endpoint}
          />
          <Skeleton variant="rect" width="100%" height={52} />
        </div>
      </div>
    </div>
  );
};
