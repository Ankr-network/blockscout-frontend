import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { GradientedText } from 'modules/common/components/GradientedText';

import { intlRoot } from '../../const';
import { usePAYGLabelStyles } from './PAYGLabelStyles';

const intlKey = `${intlRoot}.payg-label`;

interface IPAYGLabelProps {
  size: 'small' | 'medium' | 'large';
  className?: string;
}

export const PAYGLabel = ({ className, size = 'medium' }: IPAYGLabelProps) => {
  const { classes, cx } = usePAYGLabelStyles();

  const isSmall = size === 'small';

  return (
    <Typography
      variant={isSmall ? 'body4' : 'body2'}
      className={cx(classes.root, isSmall && classes.smallRoot, className)}
    >
      <GradientedText>{t(intlKey)}</GradientedText>
    </Typography>
  );
};
