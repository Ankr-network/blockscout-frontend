import { ButtonBase } from '@material-ui/core';
import classNames from 'classnames';
import { ReactText } from 'react';

import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { useQuestionWithTooltipStyles } from './useQuestionWithTooltipStyles';

interface IQuestionWithTooltipProps {
  children: ReactText | JSX.Element;
  className?: string;
  leftOffset?: number;
}

export const QuestionWithTooltip = ({
  children,
  className,
  leftOffset = 0.5,
}: IQuestionWithTooltipProps): JSX.Element => {
  const classes = useQuestionWithTooltipStyles({
    marginLeft: leftOffset,
  });

  return (
    <Tooltip arrow title={children}>
      <ButtonBase className={classNames(classes.btn, className)}>
        <QuestionIcon className={classes.icon} htmlColor="inherit" size="xs" />
      </ButtonBase>
    </Tooltip>
  );
};
