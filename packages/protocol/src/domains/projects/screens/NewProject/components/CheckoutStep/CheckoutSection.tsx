import { ReactNode } from 'react';
import { Button, Typography } from '@mui/material';
import { Edit } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { newProjectIntlRoot } from 'domains/projects/const';

import { useCheckoutStepStyles } from './useCheckoutStepStyles';

interface CheckoutSectionProps {
  children?: ReactNode;
  className?: string;
  onEdit?: () => void;
  title: string;
  titleClassName?: string;
}

export const CheckoutSection = ({
  children,
  className,
  onEdit,
  title,
  titleClassName,
}: CheckoutSectionProps) => {
  const { classes, cx } = useCheckoutStepStyles();

  return (
    <div className={cx(classes.section, className)}>
      <Typography
        className={cx(classes.sectionTitle, titleClassName)}
        component="div"
        variant="subtitle2"
      >
        {title}
      </Typography>
      {typeof onEdit === 'function' && (
        <Button
          onClick={onEdit}
          variant="text"
          startIcon={<Edit />}
          className={classes.editButton}
        >
          {t(`${newProjectIntlRoot}.checkout-step.edit`)}
        </Button>
      )}
      {children}
    </div>
  );
};
