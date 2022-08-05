import { t } from 'common';

import { useDateTimeItemStyles } from './useDateTimeItemStyles';

interface IDateTimeItemProps {
  dateTime: Date;
}

export const DateTimeItem = ({ dateTime }: IDateTimeItemProps): JSX.Element => {
  const classes = useDateTimeItemStyles();

  return (
    <div className={classes.root}>
      <div className={classes.infoWrapper}>
        {t('format.long-date', { value: dateTime })}

        <div className={classes.time}>
          {t('format.time-short', { value: dateTime })}
        </div>
      </div>
    </div>
  );
};
