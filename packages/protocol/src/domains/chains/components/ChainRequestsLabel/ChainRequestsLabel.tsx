import { Typography, TypographyTypeMap } from '@mui/material';

import { useChainRequestsLabelStyles } from './ChainRequestsLabelStyles';

export interface ChainRequestsLabelProps {
  className?: string;
  description?: string;
  descriptionClassName?: string;
  descriptionColor?: TypographyTypeMap['props']['color'];
  label?: string;
}

export const ChainRequestsLabel = ({
  className = '',
  description,
  descriptionClassName,
  descriptionColor = 'textPrimary',
  label,
}: ChainRequestsLabelProps) => {
  const { classes, cx } = useChainRequestsLabelStyles();

  if (!description && !label) {
    return null;
  }

  return (
    <div className={className}>
      <Typography
        className={cx(classes.subtitle, descriptionClassName)}
        color={descriptionColor}
        noWrap
        variant="subtitle2"
      >
        {description?.toUpperCase()}
      </Typography>
      {label && (
        <Typography
          className={classes.label}
          variant="caption"
          color="textSecondary"
        >
          {label}
        </Typography>
      )}
    </div>
  );
};
