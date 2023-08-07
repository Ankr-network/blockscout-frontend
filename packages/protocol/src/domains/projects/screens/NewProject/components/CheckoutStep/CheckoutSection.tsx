import { ReactNode } from 'react';
import { Button, Typography } from '@mui/material';
import { Edit } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { newProjectIntlRoot } from 'domains/projects/const';

import { useCheckoutStepStyles } from './useCheckoutStepStyles';

interface CheckoutSectionProps {
  title: string;
  onEdit?: () => void;
  children?: ReactNode;
}

const isEditButtonsHidden = true;

export const CheckoutSection = ({
  title,
  onEdit,
  children,
}: CheckoutSectionProps) => {
  const { classes } = useCheckoutStepStyles();

  return (
    <div className={classes.section}>
      <Typography className={classes.subtitle} variant="subtitle2">
        {title}
      </Typography>
      {typeof onEdit === 'function' && !isEditButtonsHidden && (
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
