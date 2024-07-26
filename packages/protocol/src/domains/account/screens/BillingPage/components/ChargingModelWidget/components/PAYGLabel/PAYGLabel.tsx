import { Typography, TypographyOwnProps } from '@mui/material';
import { t } from '@ankr.com/common';

import { GradientedText } from 'modules/common/components/GradientedText';

import { intlRoot } from '../../const';
import { usePAYGLabelStyles } from './PAYGLabelStyles';

const intlKey = `${intlRoot}.payg-label`;

type Size = 'small' | 'medium' | 'large';

interface IPAYGLabelProps {
  className?: string;
  size: Size;
}

const variantsMap: Record<Size, TypographyOwnProps['variant']> = {
  large: 'body2',
  medium: 'body3',
  small: 'body4',
};

export const PAYGLabel = ({ className, size = 'medium' }: IPAYGLabelProps) => {
  const { classes, cx } = usePAYGLabelStyles();

  return (
    <Typography
      className={cx(classes.root, className, {
        [classes.smallRoot]: size === 'small',
        [classes.mediumRoot]: size === 'medium',
      })}
      variant={variantsMap[size]}
    >
      <GradientedText>{t(intlKey)}</GradientedText>
    </Typography>
  );
};
