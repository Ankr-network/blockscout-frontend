import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import { Field } from 'react-final-form';
import { t, tHTML } from '@ankr.com/common';

import { OnChange } from 'modules/form/utils/OnChange';
import { InputDialogFormField } from 'modules/common/components/InputDialogFormField';

import { useAddAndEditWhitelistItemFormStyles } from './useAddAndEditWhitelistItemFormStyles';
import {
  getValidation,
  AddToWhitelistFormFields,
} from './AddToWhitelistFormUtils';
import { ChainItem } from '../ChainItem';
import { SelectTypeField } from '../SelectTypeField';
import { useMainForm } from './useMainForm';

interface MainFormProps {
  shouldSkipFormReset?: boolean;
  handleSubmit: () => void;
}

export const MainForm = ({
  shouldSkipFormReset,
  handleSubmit,
}: MainFormProps) => {
  const { classes, cx } = useAddAndEditWhitelistItemFormStyles();

  const {
    handleOnChange,
    selectOptions,
    isTypeSelected,
    selectedType,
    whitelistDialog,
    isValid,
    preparedChains,
    isSmartContractAddressSelected,
    isAtLeastOneChainSelected,
    isFormFilled,
  } = useMainForm(shouldSkipFormReset);

  return (
    <form onSubmit={handleSubmit}>
      <OnChange name={AddToWhitelistFormFields.type}>{handleOnChange}</OnChange>

      <FormControl className={cx(classes.formWrapper, classes.selectWrapper)}>
        <InputLabel className={classes.label}>
          {t('projects.add-whitelist-dialog.select-type')}
        </InputLabel>
        <Field
          name={AddToWhitelistFormFields.type}
          key={AddToWhitelistFormFields.type}
          component={SelectTypeField}
          variant="outlined"
          options={selectOptions}
          isTypeSelected={isTypeSelected}
        />
      </FormControl>

      <FormControl className={cx(classes.formWrapper, classes.inputWrapper)}>
        <InputDialogFormField
          name={AddToWhitelistFormFields.value}
          isDisabled={!isTypeSelected}
          placeholder={t('projects.add-whitelist-dialog.enter')}
          validate={getValidation(selectedType)}
        />
      </FormControl>

      {whitelistDialog?.value && isValid && (
        <>
          <Typography component="p" className={classes.chainsTitle}>
            {t('projects.add-whitelist-dialog.select-chain')}
          </Typography>

          <Typography component="p" className={classes.description}>
            {tHTML('projects.add-whitelist-dialog.select-chain-description')}
          </Typography>

          <Divider className={classes.divider} />

          <FormControl
            className={cx(classes.formWrapper, classes.inputWrapper)}
          >
            {preparedChains.map(({ id: chainId, name }) => (
              <Field
                name={AddToWhitelistFormFields.chains}
                key={chainId}
                label={name}
                value={chainId}
                disabled={
                  isSmartContractAddressSelected && isAtLeastOneChainSelected
                }
                component={ChainItem}
                type="checkbox"
                className={classes.chainWrapper}
              />
            ))}
          </FormControl>
        </>
      )}

      <Button
        fullWidth
        size="large"
        disabled={!isFormFilled || !isValid}
        className={classes.submitButton}
        onClick={handleSubmit}
      >
        {t('projects.add-whitelist-dialog.confirm')}
      </Button>
    </form>
  );
};
