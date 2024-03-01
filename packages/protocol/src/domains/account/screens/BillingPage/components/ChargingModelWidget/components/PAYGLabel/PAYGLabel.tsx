import { t } from '@ankr.com/common';

import { GradientedText } from 'modules/common/components/GradientedText';

import { intlRoot } from '../../const';
import { usePAYGLabelStyles } from './PAYGLabelStyles';
import { Typography } from '@mui/material';

const intlKey = `${intlRoot}.payg-label`;

interface IPAYGLabelProps {
  isSmall?: boolean;
  className?: string;
}

export const PAYGLabel = ({ isSmall = false, className }: IPAYGLabelProps) => {
  const { classes, cx } = usePAYGLabelStyles();

  return (
    <Typography
      variant={isSmall ? 'body4' : 'body2'}
      className={cx(classes.root, isSmall && classes.smallRoot, className)}
    >
      <GradientedText>{t(intlKey)}</GradientedText>
    </Typography>
  );
};
