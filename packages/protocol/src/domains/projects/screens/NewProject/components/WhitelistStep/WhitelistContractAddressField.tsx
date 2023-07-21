import { Field } from 'react-final-form';
import { Typography } from '@mui/material';
import { Check } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { InputField } from 'modules/form/components/InputField';

import { useWhitelistInput } from './useWhitelistInput';
import { useWhitelistStepStyles } from './useWhitelistStepStyles';

export const WhitelistContractAddressField = () => {
  const { classes } = useWhitelistStepStyles();

  const { onChange, success, normalizeValue, key, isErrorHighlighted } =
    useWhitelistInput();

  return (
    <>
      <Field
        name={key}
        component={InputField}
        variant="outlined"
        placeholder={t('projects.new-project.step-2.placeholder')}
        parse={normalizeValue}
        isHelperTextVisible
        InputProps={{
          className: classes.whitelistInput,
        }}
        error={isErrorHighlighted}
        onChange={onChange}
      />

      {success && (
        <Typography
          color="success"
          variant="caption"
          component="p"
          mt={2}
          className={classes.success}
        >
          <Check className={classes.iconCheck} />
          {t('projects.new-project.step-2.success-message')}
        </Typography>
      )}
    </>
  );
};
