import { Button, FormControl, InputLabel, Typography } from '@mui/material';
import { Field } from 'react-final-form';
import { t } from '@ankr.com/common';

import { OnChange } from 'modules/form/utils/OnChange';
import { InputDialogFormField } from 'modules/common/components/InputDialogFormField';
import { WhiteListItem } from 'domains/projects/types';

import { useAddAndEditWhitelistItemFormStyles } from './useAddAndEditWhitelistItemFormStyles';
import {
  getValidation,
  AddToWhitelistFormFields,
  getPlaceholder,
  getLabel,
  getSelectChainDescription,
} from './AddToWhitelistFormUtils';
import { ChainItem } from '../ChainItem';
import { useMainForm } from './useMainForm';
import { WhitelistItemsCounter } from '../../../WhitelistItemsCounter';

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
    isTypeSelected,
    selectedType,
    isValid,
    preparedChains,
    isSmartContractAddressSelected,
    isAtLeastOneChainSelected,
    isFormFilled,
  } = useMainForm(shouldSkipFormReset);

  const isSubmitButtonDisabled = !isFormFilled || !isValid;

  return (
    <form onSubmit={handleSubmit}>
      <OnChange name={AddToWhitelistFormFields.type}>{handleOnChange}</OnChange>

      <WhitelistItemsCounter type={selectedType} className={classes.counter} />

      <FormControl className={classes.formWrapper}>
        <InputLabel className={classes.label}>
          {getLabel(selectedType)}
        </InputLabel>
        <InputDialogFormField
          isRequired
          shouldSkipPristineForValidation
          name={AddToWhitelistFormFields.value}
          isDisabled={!isTypeSelected}
          placeholder={getPlaceholder(selectedType)}
          validate={getValidation(selectedType)}
        />
      </FormControl>

      <Typography component="p" className={classes.chainsTitle}>
        {t('projects.add-whitelist-dialog.select-chain')}
      </Typography>

      <Typography component="p" className={classes.description}>
        {getSelectChainDescription(selectedType)}
        {selectedType === WhiteListItem.address &&
          ` ${t('projects.add-whitelist-dialog.only-evm-chains')}`}
      </Typography>

      <FormControl className={cx(classes.formWrapper, classes.inputWrapper)}>
        {preparedChains.map(({ id: chainId, name, disabled }) => (
          <Field
            name={AddToWhitelistFormFields.chains}
            key={chainId}
            label={name}
            value={chainId}
            disabled={
              (isSmartContractAddressSelected && isAtLeastOneChainSelected) ||
              disabled
            }
            component={ChainItem}
            type="checkbox"
            className={classes.chainWrapper}
          />
        ))}
      </FormControl>

      <Button
        fullWidth
        size="large"
        disabled={!isFormFilled || !isValid}
        className={classes.submitButton}
        onClick={isSubmitButtonDisabled ? undefined : handleSubmit}
      >
        {t('projects.add-whitelist-dialog.confirm')}
      </Button>
    </form>
  );
};
