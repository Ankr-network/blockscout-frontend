import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { useAdditionalInfoStyles } from './useAdditionalInfoStyles';

// TODO: change it
export enum EStatus {
  Ok,
  Bad,
}

interface IAdditionalInfoItemProps {
  label: string;
  value: string;
  status: EStatus;
}

export const AdditionalInfoItem = ({
  label,
  value,
  status,
}: IAdditionalInfoItemProps): JSX.Element => {
  const classes = useAdditionalInfoStyles();

  return (
    <div className={classes.info}>
      <Typography
        className={classNames(classes.value, classes.label)}
        color="textSecondary"
      >
        {label}
      </Typography>

      <Typography
        className={classNames(classes.value, {
          [classes.green]: status === EStatus.Ok,
          [classes.red]: status === EStatus.Bad,
        })}
      >
        {value}
      </Typography>
    </div>
  );
};
