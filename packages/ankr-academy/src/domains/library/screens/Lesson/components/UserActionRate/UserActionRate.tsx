import React, { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import classNames from 'classnames';

import loveEmoji from 'assets/img/rate/love.png';
import goodEmoji from 'assets/img/rate/good.png';
import normalEmoji from 'assets/img/rate/normal.png';
import badEmoji from 'assets/img/rate/bad.png';
import worstEmoji from 'assets/img/rate/worst.png';

import { useUserActionRateStyles } from './UserActionRateStyles';

interface IUserActionRateProps {
  onClick: () => void;
}

const rates = [
  {
    value: 'love',
    text: 'I love it!',
    label: loveEmoji,
  },
  {
    value: 'good',
    text: 'Good',
    label: goodEmoji,
  },
  {
    value: 'normal',
    text: 'Normal',
    label: normalEmoji,
  },
  {
    value: 'bad',
    text: 'Bad',
    label: badEmoji,
  },
  {
    value: 'worst',
    text: 'Worst',
    label: worstEmoji,
  },
];

export const UserActionRate = ({ onClick }: IUserActionRateProps) => {
  const classes = useUserActionRateStyles();
  const [value, setValue] = useState<string | undefined>();
  const currentRateObject = rates.find(i => i.value === value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentTarget = event.target as HTMLInputElement;
    if (currentTarget.value) {
      setValue(currentTarget.value);
      onClick();
    }
  };

  const renderFormControl = (rate: { value: string; label: string }) => {
    return (
      <FormControlLabel
        className={classes.controlLabel}
        key={rate.value}
        value={rate.value}
        control={
          <Radio
            onChange={handleChange}
            checked={rate.value === value}
            className={classes.radio}
            icon={
              <img
                className={classes.rateIcon}
                src={rate.label}
                alt={rate.value}
              />
            }
            checkedIcon={
              <img
                className={classNames(
                  classes.rateIcon,
                  classes.rateIconSelected,
                )}
                src={rate.label}
                alt={rate.value}
              />
            }
          />
        }
        label=""
      />
    );
  };

  return (
    <Paper className={classes.userActionRateRoot}>
      <FormControl className={classes.formControl} component="fieldset">
        <FormLabel component="legend" className={classes.legend}>
          <Typography variant="h4" color="textPrimary" align="center">
            {currentRateObject?.text || 'Rate class'}
          </Typography>
        </FormLabel>
        <RadioGroup aria-label="rate" name="rate" className={classes.formGroup}>
          {rates.map(renderFormControl)}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};
