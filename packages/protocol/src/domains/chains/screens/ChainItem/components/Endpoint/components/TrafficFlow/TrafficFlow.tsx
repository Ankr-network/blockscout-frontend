import React from 'react';
import { Button, Typography } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';

import { useStyles } from './TrafficFlowStyle';

const flow = [
  t('providers.traffic-flow.items.item-1'),
  t('providers.traffic-flow.items.item-2'),
  t('providers.traffic-flow.items.item-3'),
];

export const TrafficFlow = () => {
  const classes = useStyles();

  return (
    <div className={classes.trafficFlowRoot}>
      <div className={classes.left}>
        <Typography className={classes.title} variant="body2">
          {t('providers.traffic-flow.title')}
        </Typography>
        <Button
          className={classes.learnMoreButton}
          color="primary"
          href="https://www.ankr.com/docs/build-blockchain/products/v2/hybrid-infra"
          target="_blank"
          variant="text"
        >
          {t('providers.traffic-flow.learn-more-button.title')}
        </Button>
      </div>
      <div className={classes.right}>
        {flow.map((item, index) => (
          <>
            <div className={classes.flowItem} key={item}>
              {`${index + 1}. ${item}`}
            </div>
            {index !== flow.length - 1 && (
              <div className={classes.separator}>
                <div className={classes.dot} />
                <div className={classes.dot} />
                <div className={classes.dot} />
                <div className={classes.dot} />
                <div className={classes.dot} />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};
