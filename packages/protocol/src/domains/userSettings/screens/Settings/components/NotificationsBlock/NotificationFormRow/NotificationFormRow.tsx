import { ReactNode } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Typography, Checkbox, Switch } from '@mui/material';

import { useIsSMDown } from 'uiKit/Theme/useTheme';

import { useNotificationFormRowStyles } from './useNotificationFormRowStyles';

interface INotificationFormRowProps extends FieldRenderProps<boolean> {
  label: string;
  disabled?: boolean;
  children?: ReactNode;
}

export const NotificationFormRow = ({
  className = '',
  disabled,
  input,
  label,
}: INotificationFormRowProps) => {
  const { classes, cx } = useNotificationFormRowStyles();

  const isMobile = useIsSMDown();

  const isChecked = Boolean(input?.checked);

  return (
    <div className={cx(classes.root, className)}>
      <Typography variant="body3" className={classes.label}>
        {label}
      </Typography>
      <div className={classes.inApp}>
        <Checkbox checked disabled />
      </div>
      <div className={classes.email}>
        {isMobile ? (
          <Switch
            disabled={disabled}
            checked={isChecked}
            onChange={input.onChange}
          />
        ) : (
          <Checkbox
            disabled={disabled}
            checked={isChecked}
            onChange={input.onChange}
          />
        )}
      </div>
    </div>
  );
};
