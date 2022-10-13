import { Typography } from '@material-ui/core';
// eslint-disable-next-line
// @ts-ignore @typescript-eslint/ban-ts-comment
import ReactCountryFlag from 'react-country-flag';

import { useLocationItemStyles } from './useLocationItemStyles';

interface ILocationItemProps {
  country: string;
  countryCode: string;
}

export const LocationItem = ({
  country,
  countryCode,
}: ILocationItemProps): JSX.Element => {
  const classes = useLocationItemStyles();

  return (
    <div className={classes.root}>
      <ReactCountryFlag
        svg
        className={classes.icon}
        countryCode={countryCode}
      />

      <Typography className={classes.simpleText} color="textSecondary">
        {country}
      </Typography>
    </div>
  );
};
