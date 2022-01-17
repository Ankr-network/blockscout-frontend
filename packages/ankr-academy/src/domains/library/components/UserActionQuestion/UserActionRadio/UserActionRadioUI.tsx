import React, { ReactElement } from 'react';
import {
  FormControl,
  FormLabel,
  Paper,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import classNames from 'classnames';

import { useUserActionQuestionStyles } from '../UserActionQuestionStyles';

interface IUserActionProps {
  question: string;
  controlElements: ReactElement[];
  className?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  preQuestionText?: string;
  description?: string;
}

export const UserActionRadioUI = ({
  question,
  controlElements,
  handleChange,
  className,
  preQuestionText,
  description,
}: IUserActionProps) => {
  const classes = useUserActionQuestionStyles();

  return (
    <Paper className={classNames(classes.formWrapper, className)}>
      {preQuestionText && (
        <Typography
          className={classes.preQuestionText}
          variant="body2"
          color="textSecondary"
        >
          {preQuestionText}
        </Typography>
      )}
      <FormControl className={classes.formControl} component="fieldset">
        <FormLabel className={classes.legend} component="legend">
          <Typography variant="h4" color="textPrimary">
            {question}
          </Typography>
          {description && (
            <Typography
              className={classes.description}
              variant="body1"
              color="textPrimary"
            >
              {description}
            </Typography>
          )}
        </FormLabel>
        <RadioGroup onChange={handleChange}>{controlElements}</RadioGroup>
      </FormControl>
    </Paper>
  );
};
