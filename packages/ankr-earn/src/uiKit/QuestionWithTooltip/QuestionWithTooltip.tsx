import { ButtonBase } from '@material-ui/core';
import classNames from 'classnames';
import { ReactNode } from 'react';

import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { useQuestionWithTooltipStyles } from './useQuestionWithTooltipStyles';

interface IQuestionWithTooltipProps {
  children?: ReactNode;
  className?: string;
  leftOffset?: number;
}

export const QuestionWithTooltip = ({
  children,
  className,
  leftOffset = 0.5,
}: IQuestionWithTooltipProps): JSX.Element | null => {
  const classes = useQuestionWithTooltipStyles({
    marginLeft: leftOffset,
  });

  return children ? (
    <Tooltip arrow title={children}>
      <ButtonBase
        className={classNames(classes.btn, className)}
        component="span"
      >
        <QuestionIcon className={classes.icon} htmlColor="inherit" size="xs" />
      </ButtonBase>
    </Tooltip>
  ) : null;
};
