import { Paper, Typography } from '@mui/material';

import { NoDataGuard, useNoDataContainerStyles } from '../NoDataGuard';
import { ScrollableContainer } from '../ScrollableContainer';
import { Timeframe30DTitle } from '../Timeframe30DTitle';
import { text } from './utils/text';
import { useTableWidgetStyles } from '../TableWidget/TableWidgetStyles';

interface TopCountriesData {
  country: string;
  count: number;
}

export interface TopCountriesWidgetProps {
  className?: string;
  data: TopCountriesData[];
}

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

export const TopCountriesWidget = ({
  className,
  data,
}: TopCountriesWidgetProps) => {
  const { cx, classes } = useTableWidgetStyles();
  const {
    classes: { container },
  } = useNoDataContainerStyles(data.length === 0);

  return (
    <Paper className={cx(classes.root, container, className)}>
      <Timeframe30DTitle
        className={cx(classes.title, {
          [classes.isHidden]: data.length > 0,
        })}
      >
        {text('title')}
      </Timeframe30DTitle>
      <NoDataGuard data={data}>
        <ScrollableContainer>
          <div className={cx(classes.row, classes.rowHeader)}>
            <Typography variant="caption">{text('country')}</Typography>
            <Typography variant="caption">{text('requests')}</Typography>
          </div>
          {data.map(({ country, count }) => {
            let regionName = '';

            try {
              regionName = regionNames.of(country) ?? '';
            } catch {
              regionName = country;
            }

            return (
              <div key={country} className={classes.row}>
                <Typography variant="caption">{regionName}</Typography>
                <Typography variant="caption">
                  {text('count', { count })}
                </Typography>
              </div>
            );
          })}
        </ScrollableContainer>
      </NoDataGuard>
    </Paper>
  );
};
