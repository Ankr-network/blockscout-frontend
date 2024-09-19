import { Paper, Typography } from '@mui/material';

import { ScrollableContainer } from 'modules/common/components/ScrollableContainer';

import { NoDataGuard, useNoDataContainerStyles } from '../NoDataGuard';
import { Title } from '../Title';
import { text } from './utils/text';
import { useTableWidgetStyles } from '../TableWidget/TableWidgetStyles';

export interface TopCountriesData {
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
  const { classes, cx } = useTableWidgetStyles();
  const {
    classes: { container },
  } = useNoDataContainerStyles(data.length === 0);

  return (
    <Paper className={cx(classes.root, container, className)}>
      <Title className={classes.title}>{text('title')}</Title>
      <NoDataGuard data={data}>
        <ScrollableContainer>
          <div
            className={cx(classes.row, classes.rowHeader, {
              [classes.isHidden]: data.length > 0,
            })}
          >
            <Typography variant="caption">{text('country')}</Typography>
            <Typography variant="caption">{text('requests')}</Typography>
          </div>
          {data.map(({ count, country }) => {
            let regionName = '';

            try {
              regionName = regionNames.of(country) || '';
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
