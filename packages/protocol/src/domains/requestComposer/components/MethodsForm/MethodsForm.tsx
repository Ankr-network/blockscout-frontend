import { Button, FormGroup, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { t } from '@ankr.com/common';

import { useEVMMethodsFormStyles } from './MethodsFormStyles';

interface MethodsFormProps {
  argumentsBlock: ReactNode[];
  methodNameSelectComponent: ReactNode;
  sampleCodeComponent?: ReactNode;
  isButtonDisabled?: boolean;
  formSpyComponent: ReactNode;
}

export const MethodsForm = ({
  argumentsBlock,
  formSpyComponent,
  isButtonDisabled,
  methodNameSelectComponent,
  sampleCodeComponent,
}: MethodsFormProps) => {
  const { classes } = useEVMMethodsFormStyles();

  return (
    <>
      <FormGroup>
        {methodNameSelectComponent}
        {argumentsBlock.length > 0 && (
          <>
            <Typography variant="body2" className={classes.argumentsTitle}>
              {t('request-composer.form.arguments-title')}
            </Typography>
            {argumentsBlock}
          </>
        )}
        <Button
          type="submit"
          size="medium"
          className={classes.button}
          disabled={isButtonDisabled}
        >
          {t('request-composer.form.button')}
        </Button>
        {sampleCodeComponent}
      </FormGroup>
      {formSpyComponent}
    </>
  );
};
