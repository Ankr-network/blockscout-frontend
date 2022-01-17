import React from 'react';
import classNames from 'classnames';
import {
  Box,
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  Radio,
  RadioProps,
  Typography,
} from '@material-ui/core';

import {
  AnswerControl,
  UserActionAnswerControlType,
} from 'domains/library/types';
import { ReactComponent as CheckboxIcon } from 'assets/img/Checkbox/Normal.svg';
import { ReactComponent as CheckboxIconChecked } from 'assets/img/Checkbox/Checked.svg';
import { ReactComponent as RadioIcon } from 'assets/img/RadioButton/Normal.svg';
import { ReactComponent as RadioIconChecked } from 'assets/img/RadioButton/Checked.svg';
import { useUserActionQuestionStyles } from '../UserActionQuestionStyles';

interface IUserActionAnswerControlProps {
  control: AnswerControl;
  isDisabled?: boolean;
  isCurrentControlActive?: boolean;
  isCorrectAnswer?: boolean;
  isIncorrectAnswer?: boolean;
  isCorrectNotAnswered?: boolean;
  controlType: UserActionAnswerControlType;
}

export const UserActionAnswerControl = ({
  control,
  isDisabled,
  isCurrentControlActive,
  isCorrectAnswer,
  isIncorrectAnswer,
  isCorrectNotAnswered,
  controlType,
}: IUserActionAnswerControlProps) => {
  const classes = useUserActionQuestionStyles();
  const controlClassNames = classNames(
    isCurrentControlActive && classes.controlButtonActive,
    isIncorrectAnswer && classes.controlButtonError,
    isCorrectAnswer && classes.controlButtonSuccess,
  );
  const controlProps: CheckboxProps | RadioProps = {
    classes: { root: classes.controlButton },
    className: controlClassNames,
    color: 'primary',
  };

  const getControl = (): React.ReactElement => {
    switch (controlType) {
      case 'checkbox':
        return (
          <Checkbox
            icon={<CheckboxIcon />}
            checkedIcon={<CheckboxIconChecked />}
            {...controlProps}
          />
        );
      case 'radio':
        return (
          <Radio
            icon={<RadioIcon />}
            checkedIcon={<RadioIconChecked />}
            {...controlProps}
          />
        );
      default:
        throw Error(`unexpected control type ${controlType}`);
    }
  };

  return (
    <Box
      className={classNames(
        classes.controlWrapper,
        isCurrentControlActive && classes.controlWrapperActive,
        isCorrectAnswer && classes.controlWrapperSuccess,
        isIncorrectAnswer && classes.controlWrapperError,
      )}
    >
      <FormControlLabel
        className={classes.label}
        key={control.value}
        value={control.value}
        control={getControl()}
        label={control.label}
        disabled={isDisabled}
      />
      {(isCorrectAnswer || isCorrectNotAnswered) && (
        <Typography
          className={classNames(
            classes.controlStatus,
            classes.controlStatusSuccess,
          )}
          variant="body2"
        >
          correct answer
        </Typography>
      )}
      {isIncorrectAnswer && (
        <Typography
          className={classNames(
            classes.controlStatus,
            classes.controlStatusError,
          )}
          variant="body2"
        >
          incorrect answer
        </Typography>
      )}
    </Box>
  );
};
