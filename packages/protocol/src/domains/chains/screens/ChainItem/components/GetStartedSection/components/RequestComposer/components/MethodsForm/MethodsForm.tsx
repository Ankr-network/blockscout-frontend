import { Button, FormGroup, Typography } from '@material-ui/core';
import { ReactNode } from 'react';

import { t } from 'modules/i18n/utils/intl';
import { useEVMMethodsFormStyles } from './MethodsFormStyles';

interface MethodsFormProps {
  argumentsBlock: ReactNode[];
  methodNameSelectComponent: ReactNode;
  sampleCodeComponent: ReactNode;
  isButtonDisabled?: boolean;
  formSpyComponent: ReactNode;
}

export const MethodsForm = ({
  methodNameSelectComponent,
  argumentsBlock,
  isButtonDisabled,
  sampleCodeComponent,
  formSpyComponent,
}: MethodsFormProps) => {
  const classes = useEVMMethodsFormStyles();

  return (
    <>
      <FormGroup>
        {methodNameSelectComponent}
        {argumentsBlock.length > 0 && (
          <>
            <Typography variant="body2" className={classes.argumentsTitle}>
              {t('chain-item.request-composer.form.arguments-title')}
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
          {t('chain-item.request-composer.form.button')}
        </Button>
        {sampleCodeComponent}
      </FormGroup>
      {formSpyComponent}
    </>
  );
};
