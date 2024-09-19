import { Button, FormControl, InputLabel, Typography } from '@mui/material';
import { Field } from 'react-final-form';
import { UserEndpointTokenMode } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { OnChange } from 'modules/form/utils/OnChange';
import { InputDialogFormField } from 'modules/common/components/InputDialogFormField';
import { WhitelistItemChainsSelectorTitle } from 'domains/projects/components/WhitelistItemChainsSelectorTitle';
import { WhitelistItemsCounter } from 'domains/projects/components/WhitelistItemsCounter';

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

interface MainFormProps {
  shouldSkipFormReset?: boolean;
  handleSubmit: () => void;
}

export const MainForm = ({
  handleSubmit,
  shouldSkipFormReset,
}: MainFormProps) => {
  const { classes, cx } = useAddAndEditWhitelistItemFormStyles();

  const {
    handleOnChange,
    isAtLeastOneChainSelected,
    isFormFilled,
    isSmartContractAddressSelected,
    isTypeSelected,
    isValid,
    preparedChains,
    selectedType,
    whitelistItems,
  } = useMainForm(shouldSkipFormReset);

  const isSubmitButtonDisabled = !isFormFilled || !isValid;

  const whitelistCount = useMemo(
    () => whitelistItems.filter(item => item.type === selectedType).length,
    [whitelistItems, selectedType],
  );

  return (
    <form onSubmit={handleSubmit}>
      <OnChange name={AddToWhitelistFormFields.type}>{handleOnChange}</OnChange>
      <WhitelistItemsCounter
        type={selectedType || UserEndpointTokenMode.REFERER}
        className={classes.counter}
        count={whitelistCount}
      />
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
      <WhitelistItemChainsSelectorTitle />
      <Typography component="p" className={classes.description}>
        {getSelectChainDescription(selectedType)}
        {selectedType === UserEndpointTokenMode.ADDRESS &&
          ` ${t('projects.add-whitelist-dialog.only-evm-chains')}`}
      </Typography>

      <FormControl className={cx(classes.formWrapper, classes.inputWrapper)}>
        {preparedChains.map(({ disabled, id: chainId, name }) => (
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
