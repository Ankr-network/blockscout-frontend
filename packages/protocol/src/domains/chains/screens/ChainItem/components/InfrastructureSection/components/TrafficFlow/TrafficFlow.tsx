import { Fragment } from 'react';
import { Button, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useStyles } from './TrafficFlowStyle';
import { Dot } from './components/Dot';

const flow = [
  t('providers.traffic-flow.items.item-1'),
  t('providers.traffic-flow.items.item-2'),
  t('providers.traffic-flow.items.item-3'),
];

export const TrafficFlow = () => {
  const { classes } = useStyles();

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
          <Fragment key={item}>
            <div className={classes.flowItem}>{`${index + 1}. ${item}`}</div>
            {index !== flow.length - 1 && (
              <div className={classes.separator}>
                <Dot />
                <Dot />
                <Dot />
                <Dot />
                <Dot />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
