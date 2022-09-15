import { Field } from 'react-final-form';

import { MethodOption } from 'domains/requestComposer/types';
import { t } from 'modules/i18n/utils/intl';
import { MethodsSelectField } from '../../MethodsSelect/MethodsSelectField';
import { useMethodNameSelectFieldStyles } from './MethodNameSelectFieldStyles';

interface MethodsSelectFieldProps {
  options: MethodOption[];
  getMethodDescription: (method?: MethodOption) => string | undefined;
}

export const MethodNameSelectField = ({
  options,
  getMethodDescription,
}: MethodsSelectFieldProps) => {
  const classes = useMethodNameSelectFieldStyles();

  return (
    <Field name="methodName">
      {fieldProps => (
        <MethodsSelectField<MethodOption>
          className={classes.methodsSelect}
          label={t('chain-item.request-composer.form.methods-label')}
          placeholder={t(
            'chain-item.request-composer.form.methods-placeholder',
          )}
          noOptionsText={t(
            'chain-item.request-composer.form.methods-no-options-text',
          )}
          options={options}
          getOptionLabel={method => method.label}
          getOptionSelected={(method, selectedMethod) =>
            method.value === selectedMethod?.value
          }
          showExtra={getMethodDescription}
          {...fieldProps}
        />
      )}
    </Field>
  );
};
