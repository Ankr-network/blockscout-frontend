import { Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { usePlaceholderStyles } from './PlaceholderStyles';

const title = t('chain-item.usage-data.chart.placeholder.title');
const subtitle = t('chain-item.usage-data.chart.placeholder.subtitle');

export const Placeholder = () => {
  const classes = usePlaceholderStyles();

  return (
    <div className={classes.placeholder}>
      <div className={classes.title}>{title}</div>
      <Typography variant="body2" className={classes.subtitle}>
        {subtitle}
      </Typography>
    </div>
  );
};
