import React, { ReactElement } from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Paper,
  Typography,
} from '@material-ui/core';
import classNames from 'classnames';
import { useUserActionQuestionStyles } from '../UserActionQuestionStyles';

interface IUserActionCheckboxUIProps {
  question: string;
  controlElements: ReactElement[];
  className?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: () => void;
  isSubmitted: boolean;
  hasSubmitButton?: boolean;
  preQuestionText?: string;
  description?: string;
}

export const UserActionCheckboxUI = ({
  question,
  controlElements,
  handleChange,
  handleSubmit,
  isSubmitted,
  className,
  hasSubmitButton,
  preQuestionText,
  description,
}: IUserActionCheckboxUIProps) => {
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
        <FormGroup onChange={handleChange}>{controlElements}</FormGroup>

        {hasSubmitButton && !isSubmitted && (
          <Button
            className={classes.btnSubmit}
            onClick={handleSubmit}
            type="submit"
            color="secondary"
          >
            Show Answer
          </Button>
        )}
      </FormControl>
    </Paper>
  );
};
