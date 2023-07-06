import { Check } from '@ankr.com/ui';
import { Paper, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { LocationsWidgetProps } from './types';
import { NoDataGuard, useNoDataContainerStyles } from '../NoDataGuard';
import { ScrollableContainer } from '../ScrollableContainer';
import { Title } from '../Title';
import { useLocationsWidgetStyles } from './LocationsWidgetStyles';

export const LocationsWidget = ({
  className,
  isLoading,
  locations,
}: LocationsWidgetProps) => {
  const { cx, classes } = useLocationsWidgetStyles();
  const {
    classes: { container },
  } = useNoDataContainerStyles(locations.length === 0);

  return (
    <Paper className={cx(classes.root, container, className)}>
      <Title className={cx(classes.title)}>
        {t('chain-item.locations.header')}
      </Title>
      <NoDataGuard data={locations} isLoading={isLoading}>
        <ScrollableContainer>
          <Typography
            variant="caption"
            className={cx(classes.details, {
              [classes.isHidden]: locations.length > 0,
            })}
          >
            {t('chain-item.locations.head.location')}
          </Typography>
          {locations.map((location, index) => (
            <Typography
              key={index}
              className={classes.locationItem}
              variant="caption"
            >
              {location.hasCheckMarkIcon && (
                <Check className={classes.checkIcon} />
              )}
              {location.continent}
            </Typography>
          ))}
        </ScrollableContainer>
      </NoDataGuard>
    </Paper>
  );
};
