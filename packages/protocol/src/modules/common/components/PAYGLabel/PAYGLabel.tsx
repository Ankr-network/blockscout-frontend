import { Typography, TypographyOwnProps } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { GradientedText } from '../GradientedText';
import { paygLabelTranslation } from './translation';
import { usePAYGLabelStyles } from './usePAYGLabelStyles';

type Size = 'small' | 'medium' | 'large';

export interface IPAYGLabelProps {
  className?: string;
  size?: Size;
}

const variantsMap: Record<Size, TypographyOwnProps['variant']> = {
  large: 'body2',
  medium: 'body3',
  small: 'body4',
};

export const PAYGLabel = ({ className, size = 'medium' }: IPAYGLabelProps) => {
  const { classes, cx } = usePAYGLabelStyles();
  const { keys, t } = useTranslation(paygLabelTranslation);

  return (
    <Typography
      className={cx(classes.root, className, {
        [classes.smallRoot]: size === 'small',
        [classes.mediumRoot]: size === 'medium',
        [classes.largeRoot]: size === 'large',
      })}
      component="div"
      variant={variantsMap[size]}
    >
      <GradientedText>{t(keys.label)}</GradientedText>
    </Typography>
  );
};
